import { createSelector } from "@reduxjs/toolkit";
import { sortUsersSlice } from "./sort-users.slice";
import { usersSlice } from "./users.slice";

export const selectSortedUsers = createSelector(
  sortUsersSlice.selectors.sortType,
  usersSlice.selectors.usersList,
  (sortType, users) => {
    return [...(users ?? [])].sort((a, b) => {
      if (sortType === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
  }
);
