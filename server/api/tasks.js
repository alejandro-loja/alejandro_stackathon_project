const router = require("express").Router();
const {
  models: { Task, User },
} = require("../db");
const Assignee = require("../db/models/Assignee");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const tasks = await Task.findAll({
      include: [
        {
          model: Assignee,
          include: [User],
        },
        {
          model: User,
        },
      ],
    });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});

router.get("/more", async (req, res, next) => {
  try {
    const tasks = await Task.findAll({
      include: [
        {
          model: Assignee,
          include: [User],
        },
        {
          model: User,
        },
      ],
    });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});
