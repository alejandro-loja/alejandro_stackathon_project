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
    username: "Lucy",
    password: "lucy",
    role: "Supervisor",
    department: "Business",
  });
  const ale = await User.create({
    username: "Ale",
    password: "ale",
    role: "Manager",
    department: "Sales",
  });
  const john = await User.create({
    username: "John",
    password: "john",
    role: "Manager",
    department: "Sales",
  });

  const joe = await User.create({
    username: "Joe",
    password: "joe",
    department: "QA",
  });
  const moe = await User.create({
    username: "Moe",
    password: "moe",
    department: "QA",
  });
  const mark = await User.create({
    username: "Mark",
    password: "mark",
    department: "R&D",
  });
  const dawn = await User.create({
    username: "Dawn",
    password: "dawn",
    department: "R&D",
  });
  const maria = await User.create({
    username: "Maria",
    password: "maria",
    department: "Production",
  });

  const [smartFood, veganSalmon, frozenFood, vanillaIceCream] =
    await Promise.all([
      Task.create({
        title: "Smart Food",
        description: "Develop Flavors for Ice Cream Bar",
        notes: "No R&D needed, used existing library",
        priority: "High",
        potential: 300000,
      }),
      Task.create({
        title: "Vegan Salmon",
        description:
          "Flavors for Vegan Product. Product must be vegan and but also natural",
        priority: "Medium",
        potential: 10000,
      }),
      Task.create({
        title: "Frozen Food",
        description: "Customer would like their product to be more palettable.",
        priority: "Medium",
        potential: 10000,
      }),
      Task.create({
        title: "Vanilla Ice Cream",
        description:
          "Customer would like a new ice cream flavor with a similar profile to the most popular brands.",
        priority: "Medium",
        potential: 10000,
      }),
    ]);

  ale.managerId = lucy.id;
  joe.managerId = ale.id;
  moe.managerId = ale.id;

  smartFood.userId = ale.id;
  smartFood.assignedId = joe.id;

  veganSalmon.userId = ale.id;
  veganSalmon.assignedId = moe.id;

  frozenFood.assignedId = moe.id;
  vanillaIceCream.assignedId = maria.id;

  // await Assignee.create({ taskId: smartFood.id, userId: joe.id });
  // await Assignee.create({ taskId: smartFood.id, userId: moe.id });

  await Promise.all[
    (ale.save(), joe.save(), moe.save(), smartFood.save(), veganSalmon.save())
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
