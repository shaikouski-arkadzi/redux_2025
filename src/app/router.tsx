import { createBrowserRouter, redirect } from "react-router-dom";
import App from "../modules/app/App";
import { UsersList } from "../modules/users/UsersList";
import { SelectedUser } from "../modules/users/SelectedUser";
import { Counters } from "../modules/counters/Counters";

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
      },
      {
        path: "users/:id",
        element: <SelectedUser />,
      },
      {
        path: "counters",
        element: <Counters />,
      },
    ],
  },
]);
