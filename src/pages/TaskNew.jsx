import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { addTask } from '../store/tasksSlice';
import { selectAllUsers } from '../selectors/usersSelectors';
import './TaskForm.css';

export default function TaskNew() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector(selectAllUsers);

  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'todo',
    userId: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) { setError('Le titre est requis.'); return; }
    setSubmitting(true);
    try {
      await dispatch(addTask({
        ...form,
        userId: form.userId ? Number(form.userId) : null,
      })).unwrap();
      navigate('/');
    } catch {
      setError('Erreur lors de la création de la tâche.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page fade-in">
      <div className="form-page-container">
        <div className="form-page-header">
          <Link to="/" className="back-link">← Retour</Link>
          <h1 className="form-page-title">Nouvelle tâche</h1>
          <p className="form-page-subtitle">Créez une nouvelle tâche et assignez-la à un membre</p>
        </div>

        <form onSubmit={handleSubmit} className="task-form card">
          {error && <div className="form-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="title">Titre *</label>
            <input
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Ex: Implémenter l'authentification"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Décrivez la tâche en détail..."
              rows={4}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="priority">Priorité</label>
              <select id="priority" name="priority" value={form.priority} onChange={handleChange}>
                <option value="high">↑ Haute</option>
                <option value="medium">→ Moyenne</option>
                <option value="low">↓ Basse</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="status">Statut initial</label>
              <select id="status" name="status" value={form.status} onChange={handleChange}>
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="userId">Assigner à</label>
            <select id="userId" name="userId" value={form.userId} onChange={handleChange}>
              <option value="">— Non assigné —</option>
              {users.map(u => (
                <option key={u.id} value={u.id}>{u.username}</option>
              ))}
            </select>
          </div>

          <div className="form-actions">
            <Link to="/" className="btn btn-secondary">Annuler</Link>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Création…' : '✓ Créer la tâche'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}