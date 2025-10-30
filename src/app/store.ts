import { configureStore } from "@reduxjs/toolkit";
import { initialUsersList, usersSlice } from "../modules/users/users.slice";
import { baseApi } from "../shared/api";
import { extraArgument } from "./extra-arguments";
import { rootReducer } from "./rootReducer";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument } }).concat(
      baseApi.middleware
    ),
});

store.dispatch(usersSlice.actions.stored({ users: initialUsersList }));
