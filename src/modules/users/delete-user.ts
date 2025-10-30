import type { AppThunk } from "../../app/store.types";
import { usersApi } from "../../shared/api";
import type { UserId } from "./user.types";

export const deleteUser =
  (userId: UserId): AppThunk<Promise<void>> =>
  async (dispatch, _, { router }) => {
    await dispatch(usersApi.endpoints.deleteUser.initiate(userId)).unwrap();

    await router.navigate("/users");

    await dispatch(
      usersApi.util.invalidateTags([{ type: "Users", id: "LIST" }])
    );
  };
