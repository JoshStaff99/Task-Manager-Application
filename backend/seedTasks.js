const Task = require('./models/Task');

async function seedTasks() {
  const count = await Task.count();
  if (count === 0) {
    await Task.bulkCreate([
      {
        title: 'Create a task manager app',
        description: 'Create a task manager app using React, Node.js and Express.js',
        status: 'in-progress',
      },
      {
        title: 'Make an awesome portfolio',
        description: 'Make a portfolio that demonstrates your expertise',
        status: 'pending',
      },
      {
        title: 'Client meeting',
        description: '30 minutes meeting',
        status: 'completed',
      },
    ]);
    console.log('Sample tasks created');
  }
}

module.exports = seedTasks;