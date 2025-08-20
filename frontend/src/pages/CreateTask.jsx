import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import TaskForm from '../components/TaskForm';

function CreateTask() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    setLoading(true);
    setError('');
    try {
      await api.post('/tasks', data);
      navigate('/tasks');
    } catch (err) {
      console.error(err);
      setError('Failed to create task.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Create New Task</h2>
      <TaskForm
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
        submitLabel="Create Task"
      />
    </div>
  );
}

export default CreateTask;