const router = require("express").Router();
const {
  models: { User, Task, Assignee },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const assignees = await Assignee.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
    });
    res.json(assignees);
  } catch (err) {
    next(err);
  }
});

router.get("/more", async (req, res, next) => {
  try {
    const assignees = await Assignee.findAll({
      include: [
        {
          model: Task,
          //   model: User,
        },
      ],
      include: [
        {
          //   model: Task,
          model: User,
        },
      ],
    });
    res.json(assignees);
  } catch (err) {
    next(err);
  }
});
