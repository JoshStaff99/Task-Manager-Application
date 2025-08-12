
import React from 'react';
import api from '../api';

function TaskItem({ task, refreshTasks }) {
  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this task?')) {
      await api.delete(`/tasks/${task.id}`);
      refreshTasks();
    }
  };

  return (
    <div className="list-group-item d-flex justify-content-between align-items-center">
      <div>
        <h5>{task.title}</h5>
        <p className="mb-1">{task.description}</p>
        <span className="badge bg-secondary me-2">{task.status}</span>
        <small className="text-muted">
          Created: {new Date(task.createdAt).toLocaleString()}
        </small>
      </div>
      <button className="btn btn-sm btn-danger" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}

export default TaskItem;