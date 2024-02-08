import { Meteor } from "meteor/meteor";
import { TasksCollection } from "../db/TasksCollection";

Meteor.publish("tasks", function publishTasks() {
  TasksCollection.find({ userId: this.userId });
});
