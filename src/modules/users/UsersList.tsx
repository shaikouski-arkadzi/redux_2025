import { useState } from "react";
import { UserListItem } from "./UserListItem";
import { useAppSelector } from "../../app/store.types";
import { usersSlice } from "./users.slice";
import "./UsersList.css";

export function UsersList() {
  const [sortType, setSortType] = useState<"asc" | "desc">("asc");

  const sortedUsers = useAppSelector((state) =>
    usersSlice.selectors.selectSortedUsers(state, sortType)
  );

  return (
    <div className="container">
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
    </div>
  );
}
