import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Tasks from './pages/Tasks';
import Dashboard from './pages/Dashboard';
import CreateTask from './pages/CreateTask';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="create" element={<CreateTask />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;