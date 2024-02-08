import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";
import { ServiceConfiguration } from "meteor/service-configuration";
import "../imports/api/tasksMethods";
import "../imports/api/tasksPublications";
import { TasksCollection } from "../imports/db/TasksCollection";

const insertTask = (taskText, user) =>
  TasksCollection.insert({
    text: taskText,
    userId: user._id,
    createdAt: new Date(),
  });

const SEED_USERNAME = "meteorite";
const SEED_PASSWORD = "password";
const GITHUB_CLIENT_ID = "9bfb94063bd4d39041a6";
const GITHUB_CLIENT_SECRET = "2f9a1a694935fdcf8b63635f9158a4881ee1474d";

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  const user = Accounts.findUserByUsername(SEED_USERNAME);

  if (TasksCollection.find().count() === 0) {
    [
      "First Task",
      "Second Task",
      "Third Task",
      "Fourth Task",
      "Fifth Task",
      "Sixth Task",
      "Seventh Task",
    ].forEach((taskText) => insertTask(taskText, user));
  }
});

ServiceConfiguration.configurations.upsert(
  { service: "github" },
  {
    $set: {
      loginStyle: "popup",
      clientId: GITHUB_CLIENT_ID,
      secret: GITHUB_CLIENT_SECRET,
    },
  }
);
