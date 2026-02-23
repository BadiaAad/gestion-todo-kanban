import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, deleteUser } from '../store/usersSlice';
import { selectAllUsers } from '../selectors/usersSelectors';
import { selectAllTasks } from '../selectors/tasksSelectors';
import './UsersPage.css';

export default function UsersPage() {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  const tasks = useSelector(selectAllTasks);

  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!username.trim()) { setError('Le nom est requis.'); return; }
    if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
      setError('Ce nom d\'utilisateur existe déjà.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      await dispatch(addUser({
        username: username.trim(),
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(username.trim())}&background=7c3aed&color=fff`,
      })).unwrap();
      setUsername('');
    } catch {
      setError('Erreur lors de la création.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteUser = async (user) => {
    const assigned = tasks.filter(t => t.userId === user.id);
    if (assigned.length > 0) {
      setDeleteError(`Impossible de supprimer "${user.username}" : assigné à ${assigned.length} tâche(s).`);
      setTimeout(() => setDeleteError(''), 4000);
      return;
    }
    if (window.confirm(`Supprimer l'utilisateur "${user.username}" ?`)) {
      dispatch(deleteUser(user.id));
    }
  };

  return (
    <div className="page fade-in">
      <div className="users-container">
        <div className="users-header">
          <h1 className="form-page-title" style={{ marginBottom: 0 }}>Utilisateurs</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 6 }}>
            {users.length} membre{users.length > 1 ? 's' : ''} dans l'équipe
          </p>
        </div>

        {deleteError && (
          <div className="form-error" style={{ maxWidth: 640, marginBottom: 20 }}>
            ⚠ {deleteError}
          </div>
        )}

        <div className="users-layout">
          {/* Add user form */}
          <div className="card add-user-card">
            <h2 className="section-title">Ajouter un membre</h2>
            <form onSubmit={handleAddUser}>
              {error && <div className="form-error">{error}</div>}
              <div className="form-group">
                <label htmlFor="username">Nom d'utilisateur</label>
                <input
                  id="username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="Ex: karim"
                />
              </div>
              {username.trim() && (
                <div className="preview-chip">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=7c3aed&color=fff`}
                    alt=""
                    className="avatar-sm"
                  />
                  <span>{username}</span>
                </div>
              )}
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 12 }} disabled={submitting}>
                {submitting ? 'Ajout…' : '+ Ajouter'}
              </button>
            </form>
          </div>

          {/* Users list */}
          <div className="users-list">
            {users.length === 0 && (
              <div className="empty-state card">
                <p style={{ fontSize: 32, marginBottom: 8 }}></p>
                <p>Aucun utilisateur</p>
              </div>
            )}
            {users.map(user => {
              const taskCount = tasks.filter(t => t.userId === user.id).length;
              return (
                <div key={user.id} className="user-row card">
                  <img src={user.avatar} alt={user.username} className="user-avatar" />
                  <div className="user-info">
                    <div className="user-name">{user.username}</div>
                    <div className="user-tasks">
                      {taskCount > 0 ? (
                        <span className="task-count">{taskCount} tâche{taskCount > 1 ? 's' : ''} assignée{taskCount > 1 ? 's' : ''}</span>
                      ) : (
                        <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>Aucune tâche</span>
                      )}
                    </div>
                  </div>
                  <div className="user-id" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>
                    #{user.id}
                  </div>
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="btn btn-danger btn-sm"
                    title={taskCount > 0 ? 'Cet utilisateur a des tâches assignées' : 'Supprimer'}
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}