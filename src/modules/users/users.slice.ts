import {
  createSelector,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { User, UserId } from "./user.types";

type UsersState = {
  entries: Record<UserId, User>;
  ids: UserId[];
  fetchUsersStatus: "idle" | "pending" | "success" | "failed";
};

const initialUserState: UsersState = {
  entries: {},
  ids: [],
  fetchUsersStatus: "idle",
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
          .sort((a, b) => {
            if (sort === "asc") {
              return a.name.localeCompare(b.name);
            } else {
              return b.name.localeCompare(a.name);
            }
          })
    ),
    selectIsFetchUsersPending: (state) => state.fetchUsersStatus === "pending",
    selectIsFetchUsersIdle: (state) => state.fetchUsersStatus === "idle",
  },
  reducers: {
    fetchUsersPending: (state) => {
      state.fetchUsersStatus = "pending";
    },
    fetchUsersSuccess: (state, action: PayloadAction<{ users: User[] }>) => {
      const { users } = action.payload;
      state.fetchUsersStatus = "success";
      state.entries = users.reduce((acc, user) => {
        acc[user.id] = user;
        return acc;
      }, {} as Record<UserId, User>);
      state.ids = users.map((user) => user.id);
    },
    fetchUsersFailed: (state) => {
      state.fetchUsersStatus = "failed";
    },
  },
});
