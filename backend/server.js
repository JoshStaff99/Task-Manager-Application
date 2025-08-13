const app = require('./app');
const sequelize = require('./utils/db');
const seedTasks = require('./seedTasks');

const PORT = 5000;

sequelize.sync().then(async () => {
  console.log('Database synced');

  // Seed data
  await seedTasks();

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Failed to sync database:', err);
});