import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Draggable } from '@hello-pangea/dnd';
import { selectUserById } from '../selectors/usersSelectors';
import './TaskCard.css';

export default function TaskCard({ task, index }) {
  const user = useSelector(selectUserById(task.userId));

  return (
    <Draggable draggableId={String(task.id)} index={index}>
      {(provided, snapshot) => (
        <div
          className={`task-card ${snapshot.isDragging ? 'dragging' : ''}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="task-card-header">
            <span className={`badge badge-${task.priority}`}>
              {task.priority === 'high' ? '↑' : task.priority === 'medium' ? '→' : '↓'} {task.priority}
            </span>
            <div className="drag-handle">⠿</div>
          </div>

          <h3 className="task-title">{task.title}</h3>
          <p className="task-desc">{task.description}</p>

          <div className="task-card-footer">
            {user ? (
              <div className="user-chip">
                <img src={user.avatar} alt={user.username} className="avatar-xs" />
                <span>{user.username}</span>
              </div>
            ) : (
              <span className="unassigned">Non assigné</span>
            )}
            <Link to={`/task/${task.id}`} className="view-btn">Voir →</Link>
          </div>
        </div>
      )}
    </Draggable>
  );
}