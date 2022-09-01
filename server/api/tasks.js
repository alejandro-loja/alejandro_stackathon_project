const router = require("express").Router();
const {
  models: { Task },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const tasks = await Task.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
    });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});
