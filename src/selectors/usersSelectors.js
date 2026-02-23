export const selectAllUsers = (state) => state.users.items;
export const selectUsersStatus = (state) => state.users.status;

export const selectUserById = (id) => (state) =>
  state.users.items.find((u) => u.id === Number(id));