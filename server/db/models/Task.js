const Sequelize = require("sequelize");
const db = require("../db");

const Task = db.define("task", {
  title: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
  priority: {
    type: Sequelize.ENUM,
    values: ["high", "low", "medium"],
  },
  dateComplete: {
    type: Sequelize.DATE,
  },
});

module.exports = Task;
