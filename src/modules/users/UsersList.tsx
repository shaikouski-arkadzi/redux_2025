import { useState } from "react";
import { UserListItem } from "./UserListItem";
import { SelectedUser } from "./SelectedUser";
import { useAppSelector } from "../../store";
import { selectSelectedUser, selectSortedUsers } from "./users.slice";
import "./UsersList.css";

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
