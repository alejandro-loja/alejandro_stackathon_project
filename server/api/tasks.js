const router = require("express").Router();
const {
  models: { Task, User },
} = require("../db");
const Assignee = require("../db/models/Assignee");
module.exports = router;

// api/tasks

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
    res.send(tasks);
  } catch (err) {
    next(err);
  }
});

router.put("/", async (req, res, next) => {
  try {
    const task = await Task.updateTask(req.body, req.params.id);
    res.json(task);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    let task = await Task.createTask(req.body);
    task = await Task.findByPk(task.id, {
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
    res.send(task);
  } catch (ex) {
    next(ex);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await Task.deleteTask(req.params.id);
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});
