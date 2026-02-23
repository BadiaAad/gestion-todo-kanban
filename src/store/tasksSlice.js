import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = 'http://localhost:3001/tasks';

export const fetchTasks = createAsyncThunk('tasks/fetchAll', async () => {
  const res = await axios.get(API);
  return res.data;
});

export const addTask = createAsyncThunk('tasks/add', async (task) => {
  const res = await axios.post(API, task);
  return res.data;
});

export const updateTask = createAsyncThunk('tasks/update', async ({ id, ...task }) => {
  const res = await axios.put(`${API}/${id}`, { id, ...task });
  return res.data;
});

export const deleteTask = createAsyncThunk('tasks/delete', async (id) => {
  await axios.delete(`${API}/${id}`);
  return id;
});

export const moveTask = createAsyncThunk('tasks/move', async ({ id, status, tasks }) => {
  const task = tasks.find(t => t.id === id);
  const res = await axios.put(`${API}/${id}`, { ...task, status });
  return res.data;
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const idx = state.items.findIndex(t => t.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter(t => t.id !== action.payload);
      })
      .addCase(moveTask.fulfilled, (state, action) => {
        const idx = state.items.findIndex(t => t.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      });
  },
});

export default tasksSlice.reducer;
