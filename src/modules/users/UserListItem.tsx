import type { User } from "./user.types";
import "./UserListItem.css";
import { useNavigate } from "react-router-dom";

export function UserListItem({ user }: { user: User }) {
  const navigate = useNavigate();

  const handleUserClick = () => {
    navigate(user.id, { relative: "path" });
  };

  return (
    <li key={user.id} className="user-item" onClick={handleUserClick}>
      <span className="user-name">{user.name}</span>
    </li>
  );
}
