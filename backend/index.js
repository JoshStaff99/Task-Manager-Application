const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// In-memory tasks store
let tasks = [];
let nextId = 1;

// GET /tasks?status=completed - Get all tasks
app.get('/tasks', (req, res) => {
  const { status } = req.query;
  if (status) {
    return res.json(tasks.filter(task => task.status === status));
  }
  res.json(tasks);
});

// GET /tasks/:id - Get task by ID
app.get('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
});

// POST /tasks - Create new task
app.post('/tasks', (req, res) => {
  const { title, description, status } = req.body;

  // Basic validation
  if (!title || !status) {
    return res.status(400).json({ error: 'Title and status are required' });
  }
  if (!['pending', 'in-progress', 'completed'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  const newTask = {
    id: nextId++,
    title,
    description: description || '',
    status,
    createdAt: new Date()
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT /tasks/:id - Update a task
app.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ error: 'Task not found' });

  const { title, description, status } = req.body;

  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (status !== undefined) {
    if (!['pending', 'in-progress', 'completed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    task.status = status;
  }

  res.json(task);
});

// DELETE /tasks/:id - Delete a task
app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ error: 'Task not found' });

  tasks.splice(index, 1);
  res.status(204).send();
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});