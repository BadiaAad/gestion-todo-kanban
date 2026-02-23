import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchTasks } from './store/tasksSlice';
import { fetchUsers } from './store/usersSlice';
import Navbar from './components/Navbar';
import KanbanBoard from './pages/KanbanBoard';
import TaskNew from './pages/TaskNew';
import TaskDetail from './pages/TaskDetail';
import TaskEdit from './pages/TaskEdit';
import UsersPage from './pages/UsersPage';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<KanbanBoard />} />
        <Route path="/tasks/new" element={<TaskNew />} />
        <Route path="/task/:id" element={<TaskDetail />} />
        <Route path="/task/:id/edit" element={<TaskEdit />} />
        <Route path="/users" element={<UsersPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
