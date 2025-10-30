import { useNavigate } from "react-router-dom";
import type { User } from "./user.types";
import { useAppDispatch } from "../../app/store.types";
import { usersSlice } from "./users.slice";
import "./UserListItem.css";

export function UserListItem({ user }: { user: User }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleUserClick = () => {
    dispatch(
      usersSlice.actions.selected({
        userId: user.id,
      })
    );
    navigate(user.id, { relative: "path" });
  };

  return (
    <li key={user.id} className="user-item" onClick={handleUserClick}>
      <span className="user-name">{user.name}</span>
    </li>
  );
}
