import { createBrowserRouter, redirect } from "react-router-dom";
import { store } from "./store";
import App from "../modules/app/App";
import { SelectedUser, UsersList } from "../modules/users";
import { Counters } from "../modules/counters";

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
          loadStore().then(async () => {});
          return null;
        },
      },
      {
        path: "users/:id",
        element: <SelectedUser />,
        loader: ({ params }) => {
          loadStore().then(() => {});
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
