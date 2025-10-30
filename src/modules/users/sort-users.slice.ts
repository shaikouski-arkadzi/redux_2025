import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { rootReducer } from "../../app/rootReducer";

export type SortType = "asc" | "desc";
type State = {
  sortType: "asc" | "desc";
};

const initialState: State = {
  sortType: "asc",
};

export const sortUsersSlice = createSlice({
  name: "users-list",
  initialState: initialState,
  selectors: {
    sortType: (state) => state.sortType,
  },
  reducers: {
    setSortType: (state, action: PayloadAction<SortType>) => {
      state.sortType = action.payload;
    },
  },
}).injectInto(rootReducer);
