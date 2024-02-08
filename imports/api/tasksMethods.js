import { check } from "meteor/check";
import { Meteor } from "meteor/meteor";
import { TasksCollection } from "../db/TasksCollection";

Meteor.methods({
  "tasks.insert"(text) {
    check(text, String);
    if (!this.userId) {
      throw new Meteor.Error("User is not authorized");
    }
    TasksCollection.insert({
      text: text.trim(),
      createdAt: new Date(),
      userId: this.userId,
    });
  },
  "tasks.remove"(taskId) {
    check(taskId, String);
    if (!this.userId) {
      throw new Meteor.Error("User is not authorized");
    }
    TasksCollection.remove(taskId);
  },
  "tasks.setIsChecked"(taskId, isChecked) {
    check(taskId, String);
    check(isChecked, Boolean);

    if (!this.userId) {
      throw new Meteor.Error("User is not authorized");
    }

    TasksCollection.update(taskId, {
      $set: {
        isChecked,
      },
    });
  },
});
