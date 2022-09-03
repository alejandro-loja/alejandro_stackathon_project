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
  },
  dateComplete: {
    type: Sequelize.DATE,
  },
  department: {
    type: Sequelize.ENUM,
    values: ["a", "b", "c"],
  },
});

Task.updateTask = async function (taskReq, id) {
  let task = await this.findByPk(id * 1);

  product = await task.update(taskReq);
  return task;
};
module.exports = Task;
