import type { AppThunk } from "../../../store";
import type { UserId } from "../user.types";
import { usersSlice } from "../users.slice";
import { fetchUsers } from "./fetch-users";

export const deleteUser =
  (userId: UserId): AppThunk<Promise<void>> =>
  async (dispatch, getState, { api }) => {
    dispatch(usersSlice.actions.deleteUserPending());

    try {
      await api.deleteUser(userId);
      dispatch(usersSlice.actions.deleteUserSuccess({ userId }));
      dispatch(fetchUsers({ refetch: true }));
    } catch (e) {
      dispatch(usersSlice.actions.deleteUserFailed());
    }
  };
