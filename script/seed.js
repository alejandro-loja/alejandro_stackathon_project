"use strict";

const {
  db,
  models: { User, Task, Assignee },
} = require("../server/db");
const { faker } = require("@faker-js/faker");
/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const lucy = await User.create({
    username: "lucy",
    password: "lucy",
    role: "supervisor",
  });
  const ale = await User.create({
    username: "ale",
    password: "ale",
    role: "manager",
  });
  const joe = await User.create({ username: "joe", password: "joe" });
  const moe = await User.create({ username: "moe", password: "moe" });
  const dawn = await User.create({ username: "dawn", password: "dawn" });
  const maria = await User.create({ username: "maria", password: "maria" });

  const [eatDirt, sleep] = await Promise.all([
    Task.create({
      title: "eat dirt",
      description: "eat dirt",
      priority: "high",
    }),
    Task.create({ title: "sleep", description: "sleep alot", priority: "low" }),
  ]);

  ale.managerId = lucy.id;
  joe.managerId = ale.id;
  moe.managerId = ale.id;

  eatDirt.userId = ale.id;
  sleep.userId = ale.id;

  await Assignee.create({ taskId: eatDirt.id, userId: joe.id });
  await Assignee.create({ taskId: eatDirt.id, userId: moe.id });

  await Promise.all[
    (ale.save(), joe.save(), moe.save(), eatDirt.save(), sleep.save())
  ];
  // console.log(`seeded ${tasks.length} tasks`);
  console.log(`seeded successfully`);
  // return {
  //   users: {
  //     cody: users[0],
  //     murphy: users[1],
  //   },
  // };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
