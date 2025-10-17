import { useNavigate, useParams } from "react-router-dom";
import type { UserId } from "./user.types";
import { useAppSelector } from "../../store.types";
import { usersSlice } from "./users.slice";
import "./SelectedUser.css";

export function SelectedUser() {
  const navigate = useNavigate();
  const { id = "" } = useParams<{ id: UserId }>();

  const user = useAppSelector((state) =>
    usersSlice.selectors.selectUserById(state, id)
  );

  const handleBackButtonClick = () => {
    navigate("..", { relative: "path" });
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
