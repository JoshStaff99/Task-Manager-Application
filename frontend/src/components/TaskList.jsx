import React, { useEffect, useState } from 'react';
import api from '../api';
import TaskItem from './TaskItem';
import TaskFilters from './TaskFilters';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks', {
        params: statusFilter ? { status: statusFilter } : {},
      });
      setTasks(res.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [statusFilter]);

  return (
    <div>
      <TaskFilters current={statusFilter} onChange={setStatusFilter} />
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <div className="list-group">
          {tasks.map(task => (
            <TaskItem key={task.id} task={task} refreshTasks={fetchTasks} />
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskList;