import { useNavigate, useParams } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/query";
import type { UserId } from "./user.types";
import { useAppDispatch, useAppSelector } from "../../app/store.types";
import { usersSlice } from "./users.slice";
import { deleteUser } from "./utils/delete-user";
import "./SelectedUser.css";
import { usersApi } from "./api/api";

export function SelectedUser() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: UserId }>();
  const { data: user, isLoading: isLoadingUser } = usersApi.useGetUserQuery(
    id ?? skipToken
  );

  const isDeletePending = useAppSelector(
    usersSlice.selectors.selectIsDeleteUserPending
  );

  const handleBackButtonClick = () => {
    navigate("..", { relative: "path" });
  };

  const handleDeleteButtonClick = async () => {
    if (!id) {
      return;
    }
    dispatch(deleteUser(id ?? "")).then(() =>
      navigate("..", { relative: "path" })
    );
  };

  if (isLoadingUser || !user) {
    return <div>Loading...</div>;
  }
  return (
    <div className="selected-user-container">
      <button onClick={handleBackButtonClick} className="btn btn-primary">
        Back
      </button>
      <h2 className="user-name">{user.name}</h2>
      <p className="user-description">{user.description}</p>
      <button
        onClick={handleDeleteButtonClick}
        className="btn btn-secondary"
        disabled={isDeletePending}
      >
        Delete
      </button>
    </div>
  );
}
