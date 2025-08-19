import React from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

function TaskItem({ task, refreshTasks }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this task?')) {
      try {
        await api.delete(`/tasks/${task.id}`);
        refreshTasks();
      } catch (err) {
        console.error('Failed to delete task:', err);
        alert('Failed to delete task');
      }
    }
  };

  const handleEdit = () => navigate(`/tasks/${task.id}/edit`);
  const handleView = () => navigate(`/tasks/${task.id}`);

  return (
    <div className="list-group-item">
      <div className="d-flex justify-content-between align-items-start flex-wrap">
        <div>
          <h5>{task.title}</h5>
          <p className="mb-1">{task.description}</p>
          <span className="badge bg-secondary me-2">{task.status}</span>
          <small className="text-muted">
            Created: {new Date(task.createdAt).toLocaleString()}
          </small>
        </div>

        {/* Inline buttons for md+ */}
        <div className="ms-auto d-none d-md-flex gap-2 align-items-start">
          <button className="btn btn-sm btn-secondary" onClick={handleView}>View</button>
          <button className="btn btn-sm btn-primary" onClick={handleEdit}>Edit</button>
          <button className="btn btn-sm btn-danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>

      {/* Dropdown for small screens */}
      <div className="d-md-none mt-3">
        <div className="dropdown w-100">
          <button className="btn btn-outline-primary dropdown-toggle w-100" type="button" data-bs-toggle="dropdown">
            Actions
          </button>
          <ul className="dropdown-menu w-100">
            <li><button className="dropdown-item" onClick={handleView}>View</button></li>
            <li><button className="dropdown-item" onClick={handleEdit}>Edit</button></li>
            <li><button className="dropdown-item text-danger" onClick={handleDelete}>Delete</button></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;