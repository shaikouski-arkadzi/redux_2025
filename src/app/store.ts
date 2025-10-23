import { configureStore } from "@reduxjs/toolkit";
import { usersSlice } from "../modules/users/users.slice";
import { countersReducer } from "../modules/counters/counters.slice";
import { extraArgument } from "./extra-arguments";
import { baseApi } from "../shared/api";

export const store = configureStore({
  reducer: {
    [usersSlice.name]: usersSlice.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
    counters: countersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument } }).concat(
      baseApi.middleware
    ),
});
