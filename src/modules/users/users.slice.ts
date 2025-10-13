import {
  createSelector,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { User, UserId } from "./user.types";

export const initialUsersList: User[] = Array.from(
  { length: 3000 },
  (_, index) => ({
    id: `user${index + 11}`,
    name: `User ${index + 11}`,
    description: `Description for User ${index + 11}`,
  })
);

type UsersState = {
  entries: Record<UserId, User>;
  ids: UserId[];
  selectedUserId: UserId | undefined;
};

export type UserSelectedAction = {
  type: "userSelected";
  payload: {
    userId: UserId;
  };
};

export type UserRemoveSelectedAction = {
  type: "userRemoveSelected";
};

export type UsersStoredAction = {
  type: "userStored";
  payload: {
    users: User[];
  };
};

const initialUserState: UsersState = {
  entries: {},
  ids: [],
  selectedUserId: undefined,
};

export const usersSlice = createSlice({
  name: "users",
  initialState: initialUserState,
  selectors: {
    selectSelectedUser: (state) =>
      state.selectedUserId ? state.entries[state.selectedUserId] : undefined,
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
  },
  reducers: {
    selected: (state, action: PayloadAction<{ userId: UserId }>) => {
      state.selectedUserId = action.payload.userId;
    },
    selectRemove: (state) => {
      state.selectedUserId = undefined;
    },
    stored: (state, action: PayloadAction<{ users: User[] }>) => {
      const { users } = action.payload;

      state.entries = users.reduce((acc, user) => {
        acc[user.id] = user;
        return acc;
      }, {} as Record<UserId, User>);
      state.ids = users.map((user) => user.id);
    },
  },
});
