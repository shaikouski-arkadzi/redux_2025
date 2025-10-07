import { useState } from "react";
import type { User } from "./user.types";
import { UserListItem } from "./UserListItem";
import { SelectedUser } from "./SelectedUser";
import "./UsersList.css";

const users: User[] = Array.from({ length: 3000 }, (_, index) => ({
  id: `user${index + 11}`,
  name: `User ${index + 11}`,
  description: `Description for User ${index + 11}`,
}));

export function UsersList() {
  const [selectedUser, setSelectedUser] = useState<User>();

  const [sortType, setSortType] = useState<"asc" | "desc">("asc");

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleBackButtonClick = () => {
    setSelectedUser(undefined);
  };

  const sortedUsers = users.sort((a, b) => {
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
              <UserListItem
                onClick={() => handleUserClick(user)}
                user={user}
                key={user.id}
              />
            ))}
          </ul>
        </div>
      ) : (
        <SelectedUser
          user={selectedUser}
          onBackButtonClick={handleBackButtonClick}
        />
      )}
    </div>
  );
}
