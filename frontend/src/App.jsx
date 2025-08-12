import React from 'react';
import TaskList from './components/TaskList';
import Layout from './components/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Layout>
      <TaskList />
    </Layout>
  );
}

export default App;