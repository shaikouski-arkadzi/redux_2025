import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAppDispatch } from "../../app/store.types";
import type { UserId } from "./user.types";
import { getUserQueryOptions } from "./api";
import { deleteUser } from "./delete-user";
import "./SelectedUser.css";

export function SelectedUser() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { id } = useParams<{ id: UserId }>();

  const { data: user } = useQuery(getUserQueryOptions(id ?? ""));

  const deleteUserMutation = useMutation({
    mutationFn: async () => {
      if (!id) {
        return;
      }
      await dispatch(deleteUser(id));
    },
  });

  const handleBackButtonClick = () => {
    navigate("..", { relative: "path" });
  };

  const handleDeleteButtonClick = async () => {
    deleteUserMutation.mutate();
  };

  return (
    <div className="selected-user-container">
      <button onClick={handleBackButtonClick} className="btn">
        Back
      </button>
      <h2 className="user-name">{user?.name}</h2>
      <p className="user-description">{user?.description}</p>
      <button
        onClick={handleDeleteButtonClick}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Delete
      </button>
    </div>
  );
}
