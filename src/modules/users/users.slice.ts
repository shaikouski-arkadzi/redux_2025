import { createAppSelector } from "../../appSelector";
import { type AppState } from "../../store";
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

type Action = UserSelectedAction | UserRemoveSelectedAction | UsersStoredAction;

const initialUserState: UsersState = {
  entries: {},
  ids: [],
  selectedUserId: undefined,
};

export const usersReducer = (
  state = initialUserState,
  action: Action
): UsersState => {
  switch (action.type) {
    case "userStored": {
      const { users } = action.payload;
      return {
        ...state,
        entries: users.reduce((acc, user) => {
          acc[user.id] = user;
          return acc;
        }, {} as Record<UserId, User>),
        ids: users.map((user) => user.id),
      };
    }
    case "userSelected": {
      const { userId } = action.payload;
      return {
        ...state,
        selectedUserId: userId,
      };
    }
    case "userRemoveSelected": {
      return {
        ...state,
        selectedUserId: undefined,
      };
    }
    default:
      return state;
  }
};

export const selectSortedUsers = createAppSelector(
  (state: AppState) => state.users.ids,
  (state: AppState) => state.users.entries,
  (_: AppState, sort: "asc" | "desc") => sort,
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
);

export const selectSelectedUser = (state: AppState) =>
  state.users.selectedUserId
    ? state.users.entries[state.users.selectedUserId]
    : undefined;
