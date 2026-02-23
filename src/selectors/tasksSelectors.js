
export const selectAllTasks = (state) => state.tasks.items;
export const selectTasksStatus = (state) => state.tasks.status;
export const selectTasksError = (state) => state.tasks.error;

export const selectTaskById = (id) => (state) =>
  state.tasks.items.find((t) => t.id === Number(id));

export const selectTasksByStatus = (status) => (state) =>
  state.tasks.items.filter((t) => t.status === status);

export const selectTasksByUser = (userId) => (state) =>
  state.tasks.items.filter((t) => t.userId === userId);
