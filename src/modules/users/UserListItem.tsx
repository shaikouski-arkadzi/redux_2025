import { useAppDispatch } from "../../store.types";
import type { User } from "./user.types";
import { usersSlice } from "./users.slice";
import "./UserListItem.css";

export function UserListItem({ user }: { user: User }) {
  const dispatch = useAppDispatch();

  const handleUserClick = () => {
    dispatch(
      usersSlice.actions.selected({
        userId: user.id,
      })
    );
  };

  return (
    <li key={user.id} className="user-item" onClick={handleUserClick}>
      <span className="user-name">{user.name}</span>
    </li>
  );
}
