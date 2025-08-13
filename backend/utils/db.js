const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './data/tasks.sqlite',
  logging: false,
});

module.exports = sequelize;