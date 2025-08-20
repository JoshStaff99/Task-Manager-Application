import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import TaskForm from '../components/TaskForm';

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await api.get(`/tasks/${id}`);
        setTask(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch task data.');
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  const handleSubmit = async (data) => {
    setSubmitLoading(true);
    setError('');
    try {
      await api.put(`/tasks/${id}`, data);
      navigate('/tasks');
    } catch (err) {
      console.error(err);
      setError('Failed to update task.');
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Task</h2>
      <TaskForm
        initialData={task}
        onSubmit={handleSubmit}
        loading={submitLoading}
        error={error}
        submitLabel="Update Task"
      />
    </div>
  );
}

export default EditTask;