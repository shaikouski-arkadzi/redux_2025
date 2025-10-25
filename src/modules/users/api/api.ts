import { baseApi } from "../../../shared/api";
import type { User, UserId } from "../user.types";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (create) => ({
    getUsers: create.query<User[], void>({
      query: () => "/users",
      providesTags: ["users", { type: "users", id: "list" }],
    }),
    getUser: create.query<User, UserId>({
      query: (userId) => `/users/${userId}`,
      providesTags: (user, error, userId) => [
        "users",
        { type: "users", id: userId },
      ],
    }),
    deleteUser: create.mutation<void, UserId>({
      query: (userId) => ({ method: "DELETE", url: `/users/${userId}` }),
      // Marks all api with this tag like invalidate,
      // Remove cache and refetch data from api
      invalidatesTags: (user, error, userId) => [
        { type: "users", id: "list" },
        { type: "users", id: userId },
      ],
    }),
  }),
  overrideExisting: true,
});
