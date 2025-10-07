import type { User } from "./user.types";
import "./SelectedUser.css";

export function SelectedUser({
  user,
  onBackButtonClick,
}: {
  user: User;
  onBackButtonClick: () => void;
}) {
  return (
    <div className="selected-user-container">
      <button onClick={onBackButtonClick} className="btn">
        Back
      </button>
      <h2 className="user-name">{user.name}</h2>
      <p className="user-description">{user.description}</p>
    </div>
  );
}
