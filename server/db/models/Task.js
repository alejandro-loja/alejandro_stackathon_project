const Sequelize = require("sequelize");
const db = require("../db");

const Task = db.define("task", {
  title: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
  notes: {
    type: Sequelize.STRING,
  },
  priority: {
    type: Sequelize.ENUM,
    values: ["Low", "Medium", "High"],
    defaultValue: "Low",
  },
  completedDate: {
    type: Sequelize.DATE,
  },
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  expectedDate: {
    type: Sequelize.DATE,
  },
  status: {
    type: Sequelize.ENUM,
    values: ["Started", "Awaiting Feedback", "Success", "Lost"],
    allowNull: true,
    defaultValue: "Started",
  },
  potential: {
    type: Sequelize.DECIMAL,
  },
});

Task.updateTask = async function (taskReq, id) {
  let task = await this.findByPk(id * 1);
  task = await task.update(taskReq);
  return task;
};
Task.createTask = async function (task) {
  return await Task.create(task);
};

Task.deleteTask = async function (id) {
  const task = await this.findByPk(id * 1);
  await task.destroy();
  return;
};

module.exports = Task;
