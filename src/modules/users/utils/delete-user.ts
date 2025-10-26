import type { AppThunk } from "../../../app/store.types";
import { usersApi } from "../api/api";
import type { UserId } from "../user.types";

export const deleteUser =
  (userId: UserId): AppThunk<Promise<void>> =>
  async (dispatch, getState, { api, router }) => {
    const user = await dispatch(
      usersApi.endpoints.deleteUser.initiate(userId, { track: false })
    ).unwrap();
    // Run mutation from Thunk
    await dispatch(usersApi.endpoints.deleteUser.initiate(userId));
    await router.navigate("/users");
    await dispatch(
      usersApi.util.invalidateTags([{ type: "users", id: "list" }])
    );
  };
