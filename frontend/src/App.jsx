import React from 'react';
import TaskList from './components/TaskList';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="container py-4">
      <h1 className="mb-4">Task Manager</h1>
      <TaskList />
    </div>
  );
}

export default App;
