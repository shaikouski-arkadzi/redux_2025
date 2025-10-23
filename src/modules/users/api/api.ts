import { baseApi } from "../../../shared/api";
import type { User } from "../user.types";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (create) => ({
    getUsers: create.query<User[], void>({
      query: () => "/users",
    }),
  }),
  overrideExisting: true,
});
