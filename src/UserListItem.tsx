import type { User } from "./user.types";
import "./UserListItem.css";

export function UserListItem({
  user,
  onClick,
}: {
  user: User;
  onClick: () => void;
}) {
  return (
    <li key={user.id} className="user-item" onClick={onClick}>
      <span className="user-name">{user.name}</span>
    </li>
  );
}
