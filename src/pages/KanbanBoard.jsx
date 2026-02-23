import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext } from '@hello-pangea/dnd';
import { moveTask } from '../store/tasksSlice';
import { selectAllTasks, selectTasksStatus } from '../selectors/tasksSelectors';
import { selectAllUsers } from '../selectors/usersSelectors';
import KanbanColumn from '../components/KanbanColumn';
import { Link } from 'react-router-dom';
import './KanbanBoard.css';

const STATUSES = ['todo', 'in-progress', 'done'];

export default function KanbanBoard() {
  const dispatch = useDispatch();
  const allTasks = useSelector(selectAllTasks);
  const taskStatus = useSelector(selectTasksStatus);
  const users = useSelector(selectAllUsers);
  const [filterUser, setFilterUser] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  const filteredTasks = allTasks.filter(t => {
    if (filterUser !== 'all' && String(t.userId) !== filterUser) return false;
    if (filterPriority !== 'all' && t.priority !== filterPriority) return false;
    return true;
  });

  const getTasksByStatus = (status) => filteredTasks.filter(t => t.status === status);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId) return;

    dispatch(moveTask({
      id: Number(draggableId),
      status: destination.droppableId,
      tasks: allTasks,
    }));
  };

  if (taskStatus === 'loading') {
    return (
      <div className="page">
        <div className="spinner" />
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: 16 }}>
          Chargement des tâches…
        </p>
      </div>
    );
  }

  if (taskStatus === 'failed') {
    return (
      <div className="page">
        <div className="card" style={{ textAlign: 'center', padding: 48 }}>
          <p style={{ color: '#ef4444', marginBottom: 12, fontSize: 18 }}>⚠ Impossible de charger les tâches</p>
          <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>
            Assurez-vous que JSON Server tourne sur le port 3001.
          </p>
          <code style={{ background: 'var(--surface2)', padding: '8px 16px', borderRadius: 6, color: 'var(--accent3)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
            json-server --watch db.json --port 3001
          </code>
        </div>
      </div>
    );
  }

  return (
    <div className="board-page">
      <div className="board-header">
        <div>
          <h1 className="board-title">Tableau Kanban</h1>
          <p className="board-subtitle">{allTasks.length} tâche{allTasks.length > 1 ? 's' : ''} au total</p>
        </div>
        <div className="board-actions">
          {/* Filter by user */}
          <select
            value={filterUser}
            onChange={e => setFilterUser(e.target.value)}
            className="filter-select"
          >
            <option value="all">Tous les utilisateurs</option>
            {users.map(u => (
              <option key={u.id} value={String(u.id)}>{u.username}</option>
            ))}
          </select>
          {/* Filter by priority */}
          <select
            value={filterPriority}
            onChange={e => setFilterPriority(e.target.value)}
            className="filter-select"
          >
            <option value="all">Toutes priorités</option>
            <option value="high">↑ Haute</option>
            <option value="medium">→ Moyenne</option>
            <option value="low">↓ Basse</option>
          </select>
          <Link to="/tasks/new" className="btn btn-primary">+ Nouvelle tâche</Link>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="kanban-board">
          {STATUSES.map(status => (
            <KanbanColumn key={status} status={status} tasks={getTasksByStatus(status)} />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}