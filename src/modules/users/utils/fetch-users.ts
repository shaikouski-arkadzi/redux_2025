import { createAppAsyncThunk } from "../../../app/store.types";
import { usersSlice } from "../users.slice";

export const fetchUsers = createAppAsyncThunk(
  "users/fetch",
  async ({ refetch }: { refetch?: boolean } = {}, thunkAPI) => {
    return thunkAPI.extra.api.getUsers();
  },
  {
    condition(params, { getState }) {
      const isIdle = usersSlice.selectors.selectIsFetchUsersIdle(getState());
      if (!params?.refetch && !isIdle) {
        return false;
      }
      return true;
    },
  }
);
