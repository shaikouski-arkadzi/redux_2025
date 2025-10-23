import { type PayloadAction } from "@reduxjs/toolkit";
import type { User, UserId } from "./user.types";
import { createSlice } from "../../app/store.types";

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
    selectIsDeleteUserPending: (state) => state.deleteUserStatus === "pending",
  },
  reducers: (creator) => ({
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
