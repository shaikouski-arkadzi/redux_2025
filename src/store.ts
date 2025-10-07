import { configureStore, createSelector } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import type { User, UserId } from "./user.types";

const users: User[] = Array.from({ length: 3000 }, (_, index) => ({
  id: `user${index + 11}`,
  name: `User ${index + 11}`,
  description: `Description for User ${index + 11}`,
}));

type UsersState = {
  entries: Record<UserId, User>;
  ids: UserId[];
  selectedUserId: UserId | undefined;
};

type CounterState = {
  counter: number;
};

export type CounterId = string;

type State = {
  counters: Record<CounterId, CounterState | undefined>;
  users: UsersState;
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

export type IncrementAction = {
  type: "increment";
  payload: {
    counterId: CounterId;
  };
};

export type DecrementAction = {
  type: "decrement";
  payload: {
    counterId: CounterId;
  };
};

type Action =
  | IncrementAction
  | DecrementAction
  | UserSelectedAction
  | UserRemoveSelectedAction
  | UsersStoredAction;

const initialUserState: UsersState = {
  entries: {},
  ids: [],
  selectedUserId: undefined,
};
const initialCounterState: CounterState = { counter: 0 };
const initialState: State = {
  counters: {},
  users: initialUserState,
};

const reducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case "increment": {
      const { counterId } = action.payload;
      const currentCounter = state.counters[counterId] ?? initialCounterState;
      return {
        ...state,
        counters: {
          ...state.counters,
          [counterId]: {
            ...currentCounter,
            counter: currentCounter.counter + 1,
          },
        },
      };
    }
    case "decrement": {
      const { counterId } = action.payload;
      const currentCounter = state.counters[counterId] ?? initialCounterState;
      return {
        ...state,
        counters: {
          ...state.counters,
          [counterId]: {
            ...currentCounter,
            counter: currentCounter.counter - 1,
          },
        },
      };
    }
    case "userStored": {
      const { users } = action.payload;
      return {
        ...state,
        users: {
          ...state.users,
          entries: users.reduce((acc, user) => {
            acc[user.id] = user;
            return acc;
          }, {} as Record<UserId, User>),
          ids: users.map((user) => user.id),
        },
      };
    }
    case "userSelected": {
      const { userId } = action.payload;
      return {
        ...state,
        users: {
          ...state.users,
          selectedUserId: userId,
        },
      };
    }
    case "userRemoveSelected": {
      return {
        ...state,
        users: {
          ...state.users,
          selectedUserId: undefined,
        },
      };
    }
    default:
      return state;
  }
};

export const store = configureStore({
  reducer: reducer,
});

store.dispatch({
  type: "userStored",
  payload: { users },
} satisfies UsersStoredAction);

export const selectCounter = (state: AppState, counterId: CounterId) =>
  state.counters[counterId];

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();
export const createAppSelector = createSelector.withTypes<AppState>();
