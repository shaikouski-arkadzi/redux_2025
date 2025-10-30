import { createBrowserRouter, redirect } from "react-router-dom";
import { store } from "./store";
import App from "../modules/app/App";
import { UsersList } from "../modules/users/UsersList";
import { SelectedUser } from "../modules/users/SelectedUser";
import { Counters } from "../modules/counters/Counters";
import { usersApi } from "../shared/api";

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
          loadStore().then(async () => {
            store.dispatch(usersApi.util.prefetch("getUsers", undefined, {}));
          });
          return null;
        },
      },
      {
        path: "users/:id",
        element: <SelectedUser />,
        loader: ({ params }) => {
          loadStore().then(() => {
            store.dispatch(
              usersApi.util.prefetch("getUser", params.id ?? "", {})
            );
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
