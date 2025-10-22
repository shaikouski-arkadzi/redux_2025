import { createSelector, type PayloadAction } from "@reduxjs/toolkit";
import type { User, UserId } from "./user.types";
import { fetchUsers } from "./utils/fetch-users";
import { createSlice, type ExtraArgument } from "../../app/store.types";

type UsersState = {
  entries: Record<UserId, User | undefined>;
  ids: UserId[];
  fetchUsersStatus: "idle" | "pending" | "success" | "failed";
  fetchUserStatus: "idle" | "pending" | "success" | "failed";
  deleteUserStatus: "idle" | "pending" | "success" | "failed";
};

const initialUserState: UsersState = {
  entries: {},
  ids: [],
  fetchUsersStatus: "idle",
  fetchUserStatus: "idle",
  deleteUserStatus: "idle",
};

export const usersSlice = createSlice({
  name: "users",
  initialState: initialUserState,
  selectors: {
    selectUserById: (state, userId: UserId) => state.entries[userId],
    selectSortedUsers: createSelector(
      (state: UsersState) => state.ids,
      (state: UsersState) => state.entries,
      (_: UsersState, sort: "asc" | "desc") => sort,
      (ids, entries, sort) =>
        ids
          .map((id) => entries[id])
          .filter((user): user is User => !!user)
          .sort((a, b) => {
            if (sort === "asc") {
              return a.name.localeCompare(b.name);
            } else {
              return b.name.localeCompare(a.name);
            }
          })
    ),
    selectIsFetchUsersPending: (state) => state.fetchUsersStatus === "pending",
    selectIsFetchUserPending: (state) => state.fetchUserStatus === "pending",
    selectIsDeleteUserPending: (state) => state.deleteUserStatus === "pending",
    selectIsFetchUsersIdle: (state) => state.fetchUsersStatus === "idle",
    selectIsFetchUserIdle: (state) => state.fetchUserStatus === "idle",
  },
  reducers: (creator) => ({
    fetchUser: creator.asyncThunk<
      User,
      { userId: UserId },
      { extra: ExtraArgument }
    >(
      (params, thunkAPI) => {
        return thunkAPI.extra.api.getUser(params.userId);
      },
      {
        pending: (state) => {
          state.fetchUserStatus = "pending";
        },
        fulfilled: (state, action) => {
          const user = action.payload;
          state.fetchUserStatus = "success";
          state.entries[user.id] = user;
        },
        rejected: (state) => {
          state.fetchUserStatus = "failed";
        },
      }
    ),

    deleteUserPending: creator.reducer((state) => {
      state.deleteUserStatus = "pending";
    }),
    deleteUserSuccess: creator.reducer(
      (state, action: PayloadAction<{ userId: UserId }>) => {
        const { userId } = action.payload;
        delete state.entries[userId];
        state.ids = state.ids.filter((id) => id !== userId);
        state.deleteUserStatus = "success";
      }
    ),
    deleteUserFailed: creator.reducer((state) => {
      state.deleteUserStatus = "failed";
    }),
  }),
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.fetchUsersStatus = "pending";
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      const users = action.payload;
      state.fetchUsersStatus = "success";
      state.entries = users.reduce((acc, user) => {
        acc[user.id] = user;
        return acc;
      }, {} as Record<UserId, User>);
      state.ids = users.map((user) => user.id);
    });
    builder.addCase(fetchUsers.rejected, (state) => {
      state.fetchUsersStatus = "failed";
    });
  },
});
