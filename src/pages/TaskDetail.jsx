import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask } from '../store/tasksSlice';
import { selectTaskById } from '../selectors/tasksSelectors';
import { selectUserById } from '../selectors/usersSelectors';
import './TaskDetail.css';

const STATUS_LABELS = {
  'todo': { label: 'To Do', cls: 'badge-todo' },
  'in-progress': { label: 'In Progress', cls: 'badge-progress' },
  'done': { label: 'Done', cls: 'badge-done' },
};

export default function TaskDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const task = useSelector(selectTaskById(id));
  const user = useSelector(selectUserById(task?.userId));

  if (!task) {
    return (
      <div className="page fade-in">
        <Link to="/" className="back-link">← Retour</Link>
        <div className="card" style={{ textAlign: 'center', padding: 48, marginTop: 20 }}>
          <p style={{ fontSize: 48, marginBottom: 12 }}>🔍</p>
          <p style={{ color: 'var(--text-muted)' }}>Tâche introuvable</p>
        </div>
      </div>
    );
  }

  const handleDelete = async () => {
    if (window.confirm('Supprimer cette tâche définitivement ?')) {
      await dispatch(deleteTask(task.id));
      navigate('/');
    }
  };

  const { label: statusLabel, cls: statusCls } = STATUS_LABELS[task.status] || {};

  return (
    <div className="page fade-in">
      <div className="detail-container">
        <Link to="/" className="back-link">← Retour au tableau</Link>

        <div className="detail-card card">
          <div className="detail-top">
            <div className="detail-badges">
              <span className={`badge badge-${task.priority}`}>
                {task.priority === 'high' ? '↑' : task.priority === 'medium' ? '→' : '↓'} {task.priority}
              </span>
              <span className={`badge ${statusCls}`}>{statusLabel}</span>
            </div>
            <div className="detail-actions">
              <Link to={`/task/${task.id}/edit`} className="btn btn-secondary btn-sm">✎ Modifier</Link>
              <button onClick={handleDelete} className="btn btn-danger btn-sm">✕ Supprimer</button>
            </div>
          </div>

          <h1 className="detail-title">{task.title}</h1>
          <p className="detail-desc">{task.description || <em style={{ color: 'var(--text-muted)' }}>Pas de description</em>}</p>

          <div className="detail-meta">
            <div className="meta-item">
              <span className="meta-label">Assigné à</span>
              {user ? (
                <div className="user-chip-lg">
                  <img src={user.avatar} alt={user.username} className="avatar-sm" />
                  <span>{user.username}</span>
                </div>
              ) : (
                <span className="meta-value" style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Non assigné</span>
              )}
            </div>

            <div className="meta-item">
              <span className="meta-label">Priorité</span>
              <span className="meta-value">{task.priority}</span>
            </div>

            <div className="meta-item">
              <span className="meta-label">Statut</span>
              <span className="meta-value">{statusLabel}</span>
            </div>

            <div className="meta-item">
              <span className="meta-label">ID de tâche</span>
              <span className="meta-value" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>#{task.id}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}