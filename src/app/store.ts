import {
  configureStore,
  type ThunkAction,
  type UnknownAction,
} from "@reduxjs/toolkit";
import { usersSlice } from "../modules/users/users.slice";
import { countersReducer } from "../modules/counters/counters.slice";
import type { AppState } from "./store.types";
import { extraArgument } from "./extra-arguments";

export const store = configureStore({
  reducer: {
    [usersSlice.name]: usersSlice.reducer,
    counters: countersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument } }),
});

export type AppThunk<R = void> = ThunkAction<
  R,
  AppState,
  typeof extraArgument,
  UnknownAction
>;
