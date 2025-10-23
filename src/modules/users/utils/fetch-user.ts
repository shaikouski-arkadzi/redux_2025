import type { AppThunk } from "../../../app/store.types";
import type { UserId } from "../user.types";
import { usersSlice } from "../users.slice";

export const fetchUser =
  (userId: UserId): AppThunk =>
  (dispatch, getState, { api }) => {
    // const isPending = usersSlice.selectors.selectIsFetchUserPending(getState());

    // if (isPending) return;

    // dispatch(usersSlice.actions.fetchUserPending());
    api.getUser(userId);
    // .then((user) => {
    //   dispatch(usersSlice.actions.fetchUserSuccess({ user }));
    // })
    // .catch(() => {
    //   dispatch(usersSlice.actions.fetchUserFailed());
    // });
  };
