import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store.types";
import type { UserId } from "./user.types";
import { usersSlice } from "./users.slice";
import "./SelectedUser.css";

export function SelectedUser() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { id } = useParams<{ id: UserId }>();

  const user = useAppSelector((state) =>
    usersSlice.selectors.userById(state, id ?? "")
  );

  const handleBackButtonClick = () => {
    dispatch(usersSlice.actions.selectRemove());
    navigate("..", { relative: "path" });
  };

  const handleDeleteButtonClick = async () => {
    if (!id) {
      return;
    }
    dispatch(usersSlice.actions.deleteUser({ userId: id }));
    navigate("..", { relative: "path" });
  };

  return (
    <div className="selected-user-container">
      <button onClick={handleBackButtonClick} className="btn">
        Back
      </button>
      <h2 className="user-name">{user.name}</h2>
      <p className="user-description">{user.description}</p>
      <button
        onClick={handleDeleteButtonClick}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Delete
      </button>
    </div>
  );
}
