const Sequelize = require("sequelize");
const db = require("../db");

const Assignee = db.define("assignee", {
  comment: {
    type: Sequelize.STRING,
  },
  department: {
    type: Sequelize.ENUM,
    values: ["R&D", "Sales", "QA", "Production", "Applications"],
    allowNull: true,
  },
});

module.exports = Assignee;
