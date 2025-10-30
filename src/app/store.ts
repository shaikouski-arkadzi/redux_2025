import { configureStore } from "@reduxjs/toolkit";
import { initialUsersList, usersSlice } from "../modules/users/users.slice";
import { countersReducer } from "../modules/counters/counters.slice";

export const store = configureStore({
  reducer: {
    [usersSlice.name]: usersSlice.reducer,
    counters: countersReducer,
  },
});

store.dispatch(usersSlice.actions.stored({ users: initialUsersList }));
