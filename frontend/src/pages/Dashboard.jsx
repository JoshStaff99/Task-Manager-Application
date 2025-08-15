import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskActions from '../components/TaskActions';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get('http://localhost:5001/tasks'); 
        setTasks(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error('Failed to fetch tasks:', err);
        setTasks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const categorizedTasks = {
    pending: tasks.filter(task => task.status === 'pending'),
    inProgress: tasks.filter(task => task.status === 'in-progress'),
    completed: tasks.filter(task => task.status === 'completed'),
  };

  const renderTaskList = (taskArray) => {
    return taskArray.length === 0 ? (
      <p className="text-muted">No tasks found.</p>
    ) : (
      <ul className="list-group">
        {taskArray.map(task => (
          <li key={task.id || task._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{task.title}</strong>
              <p className="mb-0 small text-muted">{task.description}</p>
            </div>
              <TaskActions 
                onEdit={() => console.log(`Edit task ${task.id}`)}
                onDelete={() => console.log(`Delete task ${task.id}`)}
              />
          </li>
        ))}
      </ul>
    );
  };

  if (loading) {
    return <div className="container mt-5">Loading tasks...</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Dashboard</h2>

      <div className="row g-4">
        {/* Pending */}
        <div className="col-md-4">
          <div className="card border-warning">
            <div className="card-header bg-warning text-dark fw-bold">Pending</div>
            <div className="card-body">
              {renderTaskList(categorizedTasks.pending)}
            </div>
          </div>
        </div>

        {/* In Progress */}
        <div className="col-md-4">
          <div className="card border-info">
            <div className="card-header bg-info text-white fw-bold">In Progress</div>
            <div className="card-body">
              {renderTaskList(categorizedTasks.inProgress)}
            </div>
          </div>
        </div>

        {/* Completed */}
        <div className="col-md-4">
          <div className="card border-success">
            <div className="card-header bg-success text-white fw-bold">Completed</div>
            <div className="card-body">
              {renderTaskList(categorizedTasks.completed)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;