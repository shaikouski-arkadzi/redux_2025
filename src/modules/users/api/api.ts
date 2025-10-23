import { baseApi } from "../../../shared/api";
import type { User, UserId } from "../user.types";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (create) => ({
    getUsers: create.query<User[], void>({
      query: () => "/users",
    }),
    getUser: create.query<User, UserId>({
      query: (userId) => `/users/${userId}`,
    }),
  }),
  overrideExisting: true,
});
