import { useMemo, useState } from "react";
import { UserListItem } from "./UserListItem";
import { usersApi } from "./api/api";
import "./UsersList.css";

export function UsersList() {
  const [sortType, setSortType] = useState<"asc" | "desc">("asc");

  const { data: users, isLoading } = usersApi.useGetUsersQuery();

  const sortedUsers = useMemo(() => {
    return [...(users ?? [])].sort((a, b) => {
      if (sortType === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
  }, [sortType, users]);

  if (isLoading) return <div>Loading</div>;

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
