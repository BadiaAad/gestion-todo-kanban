import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateTask } from '../store/tasksSlice';
import { selectTaskById } from '../selectors/tasksSelectors';
import { selectAllUsers } from '../selectors/usersSelectors';
import './TaskForm.css';

export default function TaskEdit() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const task = useSelector(selectTaskById(id));
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

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'medium',
        status: task.status || 'todo',
        userId: task.userId ? String(task.userId) : '',
      });
    }
  }, [task]);

  if (!task) {
    return (
      <div className="page fade-in">
        <Link to="/" className="back-link">← Retour</Link>
        <div className="card" style={{ textAlign: 'center', padding: 48, marginTop: 20 }}>
          <p style={{ color: 'var(--text-muted)' }}>Tâche introuvable</p>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) { setError('Le titre est requis.'); return; }
    setSubmitting(true);
    try {
      await dispatch(updateTask({
        id: task.id,
        ...form,
        userId: form.userId ? Number(form.userId) : null,
      })).unwrap();
      navigate(`/task/${task.id}`);
    } catch {
      setError('Erreur lors de la mise à jour.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page fade-in">
      <div className="form-page-container">
        <div className="form-page-header">
          <Link to={`/task/${task.id}`} className="back-link">← Retour aux détails</Link>
          <h1 className="form-page-title">Modifier la tâche</h1>
          <p className="form-page-subtitle">Mettez à jour les informations de la tâche <strong>#{task.id}</strong></p>
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
              placeholder="Titre de la tâche"
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
              placeholder="Description de la tâche..."
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
              <label htmlFor="status">Statut</label>
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
                <option key={u.id} value={String(u.id)}>{u.username}</option>
              ))}
            </select>
          </div>

          <div className="form-actions">
            <Link to={`/task/${task.id}`} className="btn btn-secondary">Annuler</Link>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Sauvegarde…' : '✓ Sauvegarder'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}