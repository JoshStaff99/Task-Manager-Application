
import React from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

function TaskItem({ task, refreshTasks }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this task?')) {
      await api.delete(`/tasks/${task.id}`);
      refreshTasks();
    }
  };

  const handleEdit = () => {
    navigate(`/tasks/${task.id}/edit`);
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
      <div className="ms-auto d-flex gap-2">
        <button className="btn btn-sm btn-primary" onClick={handleEdit}>
          Edit
        </button>
        <button className="btn btn-sm btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;