//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Task = require("./models/Task");
const Assignee = require("./models/Assignee");
//associations could go here!
User.hasMany(Task);
Task.belongsTo(User);

Task.hasMany(Assignee);
Assignee.belongsTo(Task);
Assignee.belongsTo(User);

User.belongsTo(User, { as: "manager" });
Task.belongsTo(User, { as: "assigned" });
module.exports = {
  db,
  models: {
    User,
    Task,
    Assignee,
  },
};
