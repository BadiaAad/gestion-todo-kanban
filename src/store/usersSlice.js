
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = 'http://localhost:3001/users';

export const fetchUsers = createAsyncThunk('users/fetchAll', async () => {
  const res = await axios.get(API);
  return res.data;
});

export const addUser = createAsyncThunk('users/add', async (user) => {
  const res = await axios.post(API, user);
  return res.data;
});

export const deleteUser = createAsyncThunk('users/delete', async (id) => {
  await axios.delete(`${API}/${id}`);
  return id;
});

const usersSlice = createSlice({
  name: 'users',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.items = state.items.filter(u => u.id !== action.payload);
      });
  },
});

export default usersSlice.reducer;
