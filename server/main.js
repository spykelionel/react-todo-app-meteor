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

Meteor.startup(() => {
  if (TasksCollection.find().count() === 0) {
    tasks.forEach(insertTask);
  }
});
