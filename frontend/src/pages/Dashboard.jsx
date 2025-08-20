import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskItem from '../components/TaskItem';
import {
  DragDropContext,
  Droppable,
  Draggable
} from '@hello-pangea/dnd';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchTasks();
  }, []);

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await axios.put(`http://localhost:5001/tasks/${taskId}`, {
        status: newStatus
      });
      fetchTasks(); // Refresh tasks after update
    } catch (err) {
      console.error('Failed to update task status:', err);
    }
  };

  const categorizedTasks = {
    pending: tasks.filter(task => task.status === 'pending'),
    'in-progress': tasks.filter(task => task.status === 'in-progress'),
    completed: tasks.filter(task => task.status === 'completed'),
  };

  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    // If dropped outside any column, do nothing
    if (!destination) return;

    // If dropped in the same place, do nothing
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Find the task being dragged
    const task = tasks.find(t => String(t.id || t._id) === draggableId);
    if (!task) return;

    // Only update status if column has changed
    if (source.droppableId !== destination.droppableId) {
      const newStatus = destination.droppableId;
      // Update local state immediately for better UX
      setTasks(prevTasks => prevTasks.map(t =>
        (String(t.id || t._id) === draggableId)
          ? { ...t, status: newStatus }
          : t
      ));
      // Update backend
      updateTaskStatus(draggableId, newStatus);
    }
  };

  const renderDroppableColumn = (statusKey, title, cardClass, headerClass) => (
    <div className="col-md-4">
      <div className={`card ${cardClass}`}>
        <div className={`card-header ${headerClass} fw-bold`}>{title}</div>
        <Droppable droppableId={statusKey}>
          {(provided, snapshot) => (
            <div
              className="card-body"
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{
                minHeight: '100px',
                background: snapshot.isDraggingOver ? '#f0f0f0' : 'inherit',
              }}
            >
              {categorizedTasks[statusKey].map((task, index) => (
                <Draggable
                  key={String(task.id || task._id)}
                  draggableId={String(task.id || task._id)}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="mb-2"
                    >
                      <TaskItem task={task} refreshTasks={fetchTasks} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Dashboard</h2>

      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="row g-4">
            {renderDroppableColumn('pending', 'Pending', 'border-warning', 'bg-warning text-dark')}
            {renderDroppableColumn('in-progress', 'In Progress', 'border-info', 'bg-info text-white')}
            {renderDroppableColumn('completed', 'Completed', 'border-success', 'bg-success text-white')}
          </div>
        </DragDropContext>
      )}
    </div>
  );
}

export default Dashboard;