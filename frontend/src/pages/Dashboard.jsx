import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get('/api/tasks');
        // Ensure the response data is an array, else fallback to empty array
        setTasks(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error('Failed to fetch tasks:', err);
        setError('Could not load tasks.');
        setTasks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return <div className="container mt-5">Loading tasks...</div>;
  }

  if (error) {
    return <div className="container mt-5 text-danger">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Dashboard</h2>
      {tasks.length === 0 ? (
        <p>No tasks available. Start by creating one!</p>
      ) : (
        <ul className="list-group">
          {tasks.map(task => (
            <li key={task._id || task.id} className="list-group-item">
              {task.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;