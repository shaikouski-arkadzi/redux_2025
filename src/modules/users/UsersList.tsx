import { useEffect, useState } from "react";
import { UserListItem } from "./UserListItem";
import { SelectedUser } from "./SelectedUser";
import { useAppDispatch, useAppSelector } from "../../store.types";
import { usersSlice } from "./users.slice";
import { api } from "../../shared/api";
import "./UsersList.css";

export function UsersList() {
  const dispatch = useAppDispatch();
  const [sortType, setSortType] = useState<"asc" | "desc">("asc");

  const isPending = useAppSelector(
    usersSlice.selectors.selectIsFetchUsersPending
  );
  const isIdle = useAppSelector(usersSlice.selectors.selectIsFetchUsersIdle);

  useEffect(() => {
    if (!isIdle) return;

    dispatch(usersSlice.actions.fetchUsersPending());
    api
      .getUsers()
      .then((users) => {
        dispatch(usersSlice.actions.fetchUsersSuccess({ users }));
      })
      .catch(() => {
        dispatch(usersSlice.actions.fetchUsersFailed());
      });
  }, [dispatch, isIdle]);

  const sortedUsers = useAppSelector((state) =>
    usersSlice.selectors.selectSortedUsers(state, sortType)
  );

  const selectedUser = useAppSelector(usersSlice.selectors.selectSelectedUser);

  if (isPending) return <div>Loading</div>;

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
