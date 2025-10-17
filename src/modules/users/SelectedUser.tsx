import type { UserId } from "./user.types";
import { useAppDispatch, useAppSelector } from "../../store.types";
import { usersSlice } from "./users.slice";
import "./SelectedUser.css";

export function SelectedUser({ userId }: { userId: UserId }) {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.users.entries[userId]);

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
