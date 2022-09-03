const Sequelize = require("sequelize");
const db = require("../db");

const Assignee = db.define("assignee", {
  comment: {
    type: Sequelize.STRING,
  },
});

module.exports = Assignee;
