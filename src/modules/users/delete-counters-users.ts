import type { AppThunk } from "../../app/store.types";
import { queryClient } from "../../shared/api";
import { resetAction, selectCountersSum } from "../counters";
import { deleteUser, getUsersQueryOptions, usersBaseKey } from "./api";
import { sortUsers } from "./select-sorted-users";
import { sortUsersSlice } from "./sort-users.slice";

export const deleteCountersUsers =
  (): AppThunk<Promise<void>> => async (dispatch, getState) => {
    const users = await queryClient.fetchQuery(getUsersQueryOptions());
    const countersSum = selectCountersSum(getState().counters);
    const sortType = sortUsersSlice.selectors.sortType(getState());

    const sortedUsers = sortUsers(sortType, users);

    const usersToDelete = sortedUsers.slice(0, countersSum);

    await Promise.all(usersToDelete.map((user) => deleteUser(user.id)));
    await queryClient.invalidateQueries({ queryKey: usersBaseKey });

    dispatch(resetAction());
  };
