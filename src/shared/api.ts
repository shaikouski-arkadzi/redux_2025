const baseUrl = "http://localhost:3002";

export const api = {
  getUsers: () => {
    return fetch(`${baseUrl}/users`).then((response) => response.json());
  },
  getUser: (userId: string) => {
    return fetch(`${baseUrl}/users/${userId}`).then((response) =>
      response.json()
    );
  },
  deleteUser: (userId: string) => {
    return fetch(`${baseUrl}/users/${userId}`, {
      method: "DELETE",
    }).then((response) => response.json());
  },
};
