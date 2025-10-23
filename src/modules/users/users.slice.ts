import { type PayloadAction } from "@reduxjs/toolkit";
import type { User, UserId } from "./user.types";
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
    selectIsFetchUserPending: (state) => state.fetchUserStatus === "pending",
    selectIsDeleteUserPending: (state) => state.deleteUserStatus === "pending",
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
});
