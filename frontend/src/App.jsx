import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import TaskList from './components/TaskList';
import Dashboard from './pages/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />           
          <Route path="/tasks" element={<TaskList />} />       
          <Route path="/dashboard" element={<Dashboard />} />  
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;