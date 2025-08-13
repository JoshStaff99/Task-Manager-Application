const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    defaultValue: '',
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending',
    validate: {
      isIn: [['pending', 'in-progress', 'completed']],
    },
  },
}, {
  timestamps: true,
});

module.exports = Task;