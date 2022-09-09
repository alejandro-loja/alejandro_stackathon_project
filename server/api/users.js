const router = require("express").Router();
const {
  models: { User, Task },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      // attributes: ["id", "username"],
      include: [
        {
          model: User,
          as: "manager",
        },
      ],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// router.get("/more", async (req, res, next) => {
//   try {
//     const users = await User.findAll({
//       include: [
//         {
//           model: User,
//           as: "manager",
//         },
//       ],
//     });
//     res.json(users);
//   } catch (err) {
//     next(err);
//   }
// });

router.put("/", async (req, res, next) => {
  try {
    const user = await User.updateUser(req.body, req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    res.send(await User.createUser(req.body));
  } catch (ex) {
    next(ex);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await User.deleteUser(req.params.id);
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});
