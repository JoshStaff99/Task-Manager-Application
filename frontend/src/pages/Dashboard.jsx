import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskActions from '../components/TaskActions';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const handleDeleteTask = async (id) => {
  if (confirm('Are you sure you want to delete this task?')) {
    try {
      await axios.delete(`http://localhost:5001/tasks/${id}`);
      // Refresh tasks after delete
      setTasks(prev => prev.filter(task => task.id !== id && task._id !== id));
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  }
  };

  const handleEditTask = (id) => {
    navigate(`/tasks/${id}/edit`);
  };

  const handleViewTask = (id) => {
    navigate(`/tasks/${id}`);
  };

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
          <li
            key={task.id || task._id}
            className="list-group-item"
          >
            <div>
              <strong>{task.title}</strong>
              <p className="mb-1 small text-muted">{task.description}</p>
            </div>

            <div className="mt-2">
              <TaskActions 
                onView={() => handleViewTask(task.id || task._id)}
                onEdit={() => handleEditTask(task.id || task._id)}
                onDelete={() => handleDeleteTask(task.id || task._id)}
              />
            </div>
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