import type { AppThunk } from "../../app/store.types";
import { queryClient } from "../../shared/api";
import { usersBaseKey } from "./api";
import type { UserId } from "./user.types";

export const deleteUser =
  (userId: UserId): AppThunk<Promise<void>> =>
  async (dispatch, _, { router }) => {
    await deleteUser(userId);
    await router.navigate("/users");
    await queryClient.invalidateQueries({
      queryKey: usersBaseKey,
    });
  };
