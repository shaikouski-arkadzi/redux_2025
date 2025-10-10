import type { User } from "./user.types";
import { useAppDispatch } from "../../store";
import type { UserRemoveSelectedAction } from "./users.slice";
import "./SelectedUser.css";

export function SelectedUser({ user }: { user: User }) {
  const dispatch = useAppDispatch();

  const handleBackButtonClick = () => {
    dispatch({
      type: "userRemoveSelected",
    } satisfies UserRemoveSelectedAction);
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
