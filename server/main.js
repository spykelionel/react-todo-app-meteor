import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";
import { TasksCollection } from "/imports/api/TasksCollection";

const insertTask = (text) =>
  TasksCollection.insert({ text, createdAt: new Date() });

const tasks = [
  "First Task",
  "Second Task",
  "Third Task",
  "Fourth Task",
  "Fifth Task",
  "Sixth Task",
  "Seventh Task",
  "Eigth Task",
];

const SEED_USERNAME = "meteorite";
const SEED_PASSWORD = "password";

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  if (TasksCollection.find().count() === 0) {
    tasks.forEach(insertTask);
  }
});
