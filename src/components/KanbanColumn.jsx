import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import TaskCard from './TaskCard';
import './KanbanColumn.css';

const COLUMN_CONFIG = {
    todo: { label: 'To Do', color: '#6366f1', icon: '○' },
    'in-progress': { label: 'In Progress', color: '#f59e0b', icon: '◑' },
    done: { label: 'Done', color: '#10b981', icon: '●' },
};

export default function KanbanColumn({ status, tasks }) {
    const config = COLUMN_CONFIG[status];

    return (
        <div className="kanban-column">
            <div className="column-header">
                <div className="column-title-row">
                    <span className="column-icon" style={{ color: config.color }}>{config.icon}</span>
                    <h2 className="column-title">{config.label}</h2>
                    <span className="column-count" style={{ background: `${config.color}22`, color: config.color }}>
                        {tasks.length}
                    </span>
                </div>
                <div className="column-accent" style={{ background: config.color }} />
            </div>

            <Droppable droppableId={status}>
                {(provided, snapshot) => (
                    <div
                        className={`column-body ${snapshot.isDraggingOver ? 'drag-over' : ''}`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={snapshot.isDraggingOver ? { background: `${config.color}11` } : {}}
                    >
                        {tasks.length === 0 && (
                            <div className="empty-state">
                                <div style={{ fontSize: 28, marginBottom: 8, opacity: 0.3 }}>{config.icon}</div>
                                <p>Aucune tâche ici</p>
                                <p style={{ fontSize: 11, marginTop: 4 }}>Glissez une tâche ici</p>
                            </div>
                        )}
                        {tasks.map((task, index) => (
                            <TaskCard key={task.id} task={task} index={index} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
}