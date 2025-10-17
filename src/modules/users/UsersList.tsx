import { useEffect, useState } from "react";
import { UserListItem } from "./UserListItem";
import { useAppDispatch, useAppSelector, useAppStore } from "../../store.types";
import { usersSlice } from "./users.slice";
import { fetchUsers } from "./utils/fetch-users";
import "./UsersList.css";

export function UsersList() {
  const dispatch = useAppDispatch();
  const appStore = useAppStore();
  const [sortType, setSortType] = useState<"asc" | "desc">("asc");

  const isPending = useAppSelector(
    usersSlice.selectors.selectIsFetchUsersPending
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch, appStore]);

  const sortedUsers = useAppSelector((state) =>
    usersSlice.selectors.selectSortedUsers(state, sortType)
  );

  if (isPending) return <div>Loading</div>;

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
