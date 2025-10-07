import { useState } from "react";
import { UserListItem } from "./UserListItem";
import { SelectedUser } from "./SelectedUser";
import { createAppSelector, useAppSelector, type AppState } from "./store";
import "./UsersList.css";

const selectSortedUsers = createAppSelector(
  (state: AppState) => state.users.ids,
  (state: AppState) => state.users.entries,
  (_: AppState, sort: "asc" | "desc") => sort,
  (ids, entries, sort) =>
    ids
      .map((id) => entries[id])
      .sort((a, b) => {
        if (sort === "asc") {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      })
);

const selectSelectedUser = (state: AppState) =>
  state.users.selectedUserId
    ? state.users.entries[state.users.selectedUserId]
    : undefined;

export function UsersList() {
  console.log("render users list");

  const [sortType, setSortType] = useState<"asc" | "desc">("asc");

  const sortedUsers = useAppSelector((state) =>
    selectSortedUsers(state, sortType)
  );

  const selectedUser = useAppSelector(selectSelectedUser);

  return (
    <div className="container">
      {!selectedUser ? (
        <div className="user-list-container">
          <div className="sort-buttons">
            <button onClick={() => setSortType("asc")} className="btn">
              Asc
            </button>
            <button
              onClick={() => setSortType("desc")}
              className="btn btn-spacing"
            >
              Desc
            </button>
          </div>
          <ul className="user-list">
            {sortedUsers.map((user) => (
              <UserListItem user={user} key={user.id} />
            ))}
          </ul>
        </div>
      ) : (
        <SelectedUser user={selectedUser} />
      )}
    </div>
  );
}
