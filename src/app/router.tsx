import { createBrowserRouter, redirect } from "react-router-dom";
import { store } from "./store";
import App from "../modules/app/App";
import { UsersList } from "../modules/users/UsersList";
import { SelectedUser } from "../modules/users/SelectedUser";
import { fetchUsers } from "../modules/users/utils/fetch-users";
import { fetchUser } from "../modules/users/utils/fetch-user";
import { Counters } from "../modules/counters/Counters";

const loadStore = () =>
  new Promise((resolve) => setTimeout(() => resolve(store), 0));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        loader: () => redirect("/users"),
      },
      {
        path: "users",
        element: <UsersList />,
        loader: () => {
          loadStore().then(() => {
            store.dispatch(fetchUsers());
          });
          return null;
        },
      },
      {
        path: "users/:id",
        element: <SelectedUser />,
        loader: ({ params }) => {
          loadStore().then(() => {
            store.dispatch(fetchUser(params.id ?? ""));
          });
          return null;
        },
      },
      {
        path: "counters",
        element: <Counters />,
      },
    ],
  },
]);
