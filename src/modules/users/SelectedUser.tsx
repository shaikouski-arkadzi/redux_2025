import { useNavigate, useParams } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/query";
import type { UserId } from "./user.types";
import { usersApi } from "./api/api";
import "./SelectedUser.css";

export function SelectedUser() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: UserId }>();
  const { data: user, isLoading: isLoadingUser } = usersApi.useGetUserQuery(
    id ?? skipToken
  );

  const [deleteUser, { isLoading: isLoadingDelete }] =
    usersApi.useDeleteUserMutation();

  const handleBackButtonClick = () => {
    navigate("..", { relative: "path" });
  };

  const handleDeleteButtonClick = async () => {
    if (!id) return;
    deleteUser(id);
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
        disabled={isLoadingDelete}
      >
        Delete
      </button>
    </div>
  );
}
