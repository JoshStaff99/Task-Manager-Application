import React, { useEffect, useState, useCallback } from 'react';
import api from '../api';
import TaskItem from './TaskItem';
import TaskFilters from './TaskFilters';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState(''); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/tasks');
      setTasks(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching tasks:', err?.message || err);
      setError('Failed to load tasks');
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const getFilteredTasks = () => {
    if (!filter) return tasks;
    return tasks.filter(task => task.status === filter);
  };

  const filteredTasks = getFilteredTasks();

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <TaskFilters current={filter} onChange={setFilter} />
        <button className="btn btn-sm btn-outline-secondary" onClick={fetchTasks}>
          Refresh
        </button>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="text-center text-muted mt-4">
          <i className="bi bi-inbox" style={{ fontSize: '2rem' }} />
          <p>No tasks found for the selected filter.</p>
        </div>
      ) : (
        <div className="list-group">
          {filteredTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskList;