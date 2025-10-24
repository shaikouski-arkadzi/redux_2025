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
  selectors: {},
  reducers: () => ({}),
});
