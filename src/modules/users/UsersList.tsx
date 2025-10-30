import { useQuery } from "@tanstack/react-query";
import { UserListItem } from "./UserListItem";
import {
  useAppDispatch,
  useAppSelector,
  type AppState,
} from "../../app/store.types";
import { sortUsersSlice } from "./sort-users.slice";
import { selectCountersSum } from "../counters";
import { sortUsers } from "./select-sorted-users";
import { deleteCountersUsers } from "./delete-counters-users";
import { getUsersQueryOptions } from "./api";
import "./UsersList.css";
import { useMemo } from "react";

export function UsersList() {
  const dispatch = useAppDispatch();

  const { data: users } = useQuery(getUsersQueryOptions());

  const sortType = useAppSelector(sortUsersSlice.selectors.sortType);

  const selectCountersSumFromAppState = (state: AppState) =>
    selectCountersSum(state.counters);

  const countersSum = useAppSelector(selectCountersSumFromAppState);

  const sortedUsers = useMemo(() => {
    return sortUsers(sortType, users ?? []);
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
          {countersSum !== 0 && (
            <button
              onClick={() => dispatch(deleteCountersUsers())}
              className="btn btn-spacing"
            >
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
