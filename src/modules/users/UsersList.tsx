import { UserListItem } from "./UserListItem";
import { useAppDispatch, useAppSelector } from "../../app/store.types";
import { sortUsersSlice } from "./sort-users.slice";
import { selectCountersSum } from "./select-counters";
import { selectSortedUsers } from "./select-sorted-users";
import "./UsersList.css";

export function UsersList() {
  const dispatch = useAppDispatch();

  const countersSum = useAppSelector(selectCountersSum);
  const sortedUsers = useAppSelector(selectSortedUsers);

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
          {countersSum !== 0 && (
            <button className="btn btn-spacing">
              Delete counter sum {countersSum}
            </button>
          )}
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
