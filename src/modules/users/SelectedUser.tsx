import { useNavigate, useParams } from "react-router-dom";
import type { UserId } from "./user.types";
import { useAppDispatch, useAppSelector } from "../../store.types";
import { usersSlice } from "./users.slice";
import "./SelectedUser.css";
import { useEffect } from "react";
import { fetchUser } from "./utils/fetch-user";
import { deleteUser } from "./utils/delete-user";

export function SelectedUser() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id = "" } = useParams<{ id: UserId }>();

  const isPending = useAppSelector(
    usersSlice.selectors.selectIsFetchUserPending
  );

  const user = useAppSelector((state) =>
    usersSlice.selectors.selectUserById(state, id)
  );

  useEffect(() => {
    dispatch(fetchUser(id));
  }, [dispatch, id]);

  const handleBackButtonClick = () => {
    navigate("..", { relative: "path" });
  };

  const handleDeleteButtonClick = async () => {
    if (!id) {
      return;
    }
    dispatch(deleteUser(id)).then(() => navigate("..", { relative: "path" }));
  };

  if (isPending || !user) {
    return <div>Loading...</div>;
  }
  return (
    <div className="selected-user-container">
      <button onClick={handleBackButtonClick} className="btn btn-primary">
        Back
      </button>
      <h2 className="user-name">{user.name}</h2>
      <p className="user-description">{user.description}</p>
      <button onClick={handleDeleteButtonClick} className="btn btn-secondary">
        Delete
      </button>
    </div>
  );
}
