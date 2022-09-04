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
    values: ["high", "low", "medium"],
    defautValue: "low",
  },
  dateComplete: {
    type: Sequelize.DATE,
  },
  department: {
    type: Sequelize.ENUM,
    values: ["a", "b", "c"],
    allowNull: true,
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
module.exports = Task;
