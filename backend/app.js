const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const sequelize = require('./utils/db');
const Task = require('./models/Task');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // allows frontend
  credentials: true
}));

app.use(express.json());
app.use(morgan('dev'));

// Routes

// GET /tasks
app.get('/tasks', async (req, res) => {
  try {
    const { status } = req.query;
    const where = status ? { status } : {};
    const tasks = await Task.findAll({ where, order: [['createdAt', 'DESC']] });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// GET /tasks/:id
app.get('/tasks/:id', async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
});

// POST /tasks
app.post('/tasks', async (req, res) => {
  const { title, description, status } = req.body;
  try {
    const task = await Task.create({ title, description, status });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /tasks/:id
app.put('/tasks/:id', async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });

  const { title, description, status } = req.body;
  try {
    await task.update({ title, description, status });
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /tasks/:id
app.delete('/tasks/:id', async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });

  await task.destroy();
  res.status(204).send();
});

module.exports = app;