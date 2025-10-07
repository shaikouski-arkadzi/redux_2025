import { useState } from "react";
import { UserListItem } from "./UserListItem";
import { SelectedUser } from "./SelectedUser";
import { useAppSelector } from "./store";
import "./UsersList.css";

export function UsersList() {
  const [sortType, setSortType] = useState<"asc" | "desc">("asc");

  const ids = useAppSelector((state) => state.users.ids);
  const entries = useAppSelector((state) => state.users.entries);
  const selectedUserId = useAppSelector((state) => state.users.selectedUserId);

  const selectedUser = selectedUserId ? entries[selectedUserId] : undefined;

  const sortedUsers = ids
    .map((id) => entries[id])
    .sort((a, b) => {
      if (sortType === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

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
