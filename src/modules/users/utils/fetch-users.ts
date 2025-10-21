import { createAppAsyncThunk } from "../../../app/store.types";

export const fetchUsers = createAppAsyncThunk(
  "users/fetch",
  async ({ refetch }: { refetch?: boolean } = {}, thunkAPI) => {
    return thunkAPI.extra.api.getUsers();
  }
);
