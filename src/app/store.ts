import { configureStore } from "@reduxjs/toolkit";
import { initialUsersList, usersSlice } from "../modules/users/users.slice";
import { countersReducer } from "../modules/counters/counters.slice";
import { sortUsersSlice } from "../modules/users/sort-users.slice";
import { baseApi } from "../shared/api";
import { extraArgument } from "./extra-arguments";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [usersSlice.name]: usersSlice.reducer,
    [sortUsersSlice.reducerPath]: sortUsersSlice.reducer,
    counters: countersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument } }).concat(
      baseApi.middleware
    ),
});

store.dispatch(usersSlice.actions.stored({ users: initialUsersList }));
