import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

function ViewTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await api.get(`/tasks/${id}`);
        setTask(res.data);
      } catch (err) {
        console.error('Failed to fetch task:', err);
        setError('Could not load task.');
      }
    };

    fetchTask();
  }, [id]);

  const handleDelete = async () => {
    const confirmed = confirm('Are you sure you want to delete this task?');
    if (!confirmed) return;

    try {
      await api.delete(`/tasks/${id}`);
      navigate('/tasks'); // or navigate('/dashboard') if you prefer
    } catch (err) {
      console.error('Failed to delete task:', err);
      setError('Failed to delete task.');
    }
  };

  if (error) {
    return <div className="container mt-5 text-danger">{error}</div>;
  }

  if (!task) {
    return <div className="container mt-5">Loading task...</div>;
  }

  return (
    <div className="container mt-5">
      <h2>{task.title}</h2>
      <p className="text-muted">{new Date(task.createdAt).toLocaleString()}</p>
      <span className={`badge bg-${task.status === 'completed' ? 'success' : task.status === 'in-progress' ? 'info' : 'warning'} mb-3`}>
        {task.status}
      </span>
      <p>{task.description}</p>

      <div className="mt-4 d-flex gap-2">
        <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
          Back
        </button>
        <button className="btn btn-primary" onClick={() => navigate(`/tasks/${id}/edit`)}>
          Edit
        </button>
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default ViewTask;