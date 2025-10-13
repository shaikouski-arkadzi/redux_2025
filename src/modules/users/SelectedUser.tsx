import type { User } from "./user.types";
import { useAppDispatch } from "../../store.types";
import { usersSlice } from "./users.slice";
import "./SelectedUser.css";

export function SelectedUser({ user }: { user: User }) {
  const dispatch = useAppDispatch();

  const handleBackButtonClick = () => {
    dispatch(usersSlice.actions.selectRemove());
  };

  return (
    <div className="selected-user-container">
      <button onClick={handleBackButtonClick} className="btn">
        Back
      </button>
      <h2 className="user-name">{user.name}</h2>
      <p className="user-description">{user.description}</p>
    </div>
  );
}
