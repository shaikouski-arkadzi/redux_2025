import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store.types";
import { usersSlice } from "./users.slice";
import "./SelectedUser.css";

export function SelectedUser() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) =>
    usersSlice.selectors.selectSelectedUser(state)
  );

  const handleBackButtonClick = () => {
    dispatch(usersSlice.actions.selectRemove());
    navigate("..", { relative: "path" });
  };

  return (
    <div className="selected-user-container">
      <button onClick={handleBackButtonClick} className="btn">
        Back
      </button>
      <h2 className="user-name">{user!.name}</h2>
      <p className="user-description">{user!.description}</p>
    </div>
  );
}
