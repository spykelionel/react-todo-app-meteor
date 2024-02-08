import { Meteor } from "meteor/meteor";
import { TasksCollection } from "../db/TasksCollection";

Meteor.publish("tasks", function () {
  TasksCollection.find({ _id: this.userId });
});
