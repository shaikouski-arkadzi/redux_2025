import { useAppDispatch, type UserSelectedAction } from "./store";
import type { User } from "./user.types";
import "./UserListItem.css";

export function UserListItem({ user }: { user: User }) {
  const dispatch = useAppDispatch();

  const handleUserClick = () => {
    dispatch({
      type: "userSelected",
      payload: { userId: user.id },
    } satisfies UserSelectedAction);
  };

  return (
    <li key={user.id} className="user-item" onClick={handleUserClick}>
      <span className="user-name">{user.name}</span>
    </li>
  );
}
