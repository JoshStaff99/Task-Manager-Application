import React from 'react';
import TaskList from '../components/TaskList';

function Tasks() {
  return (
    <div className="container mt-5">
      <h2 className="mb-3">Task List</h2>
      <TaskList />
    </div>
  );
}

export default Tasks;