import { useMemo } from "react";
import { UserListItem } from "./UserListItem";
import { useAppDispatch, useAppSelector } from "../../app/store.types";
import { usersSlice } from "./users.slice";
import { sortUsersSlice } from "./sort-users.slice";
import "./UsersList.css";

export function UsersList() {
  const dispatch = useAppDispatch();

  const users = useAppSelector(usersSlice.selectors.usersList);
  const sortType = useAppSelector(sortUsersSlice.selectors.sortType);

  const sortedUsers = useMemo(() => {
    return [...(users ?? [])].sort((a, b) => {
      if (sortType === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
  }, [users, sortType]);

  return (
    <div className="container">
      <div className="user-list-container">
        <div className="sort-buttons">
          <button
            onClick={() => dispatch(sortUsersSlice.actions.setSortType("asc"))}
            className="btn"
          >
            Asc
          </button>
          <button
            onClick={() => dispatch(sortUsersSlice.actions.setSortType("desc"))}
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
