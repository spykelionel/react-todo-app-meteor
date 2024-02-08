import { useTracker } from "meteor/react-meteor-data";
import React from "react";
import { TasksCollection } from "../api/TasksCollection";
import Task from "./Task";
import TaskForm from "./TaskForm";

export const App = () => {
  const tasks = useTracker(() =>
    TasksCollection.find({}, { sort: { createdAt: -1 } }).fetch()
  );
  return (
    <div>
      <h1>Welcome to Meteor!</h1>
      <TaskForm />
      <ul>
        {tasks.map((task) => (
          <Task key={task._id} title={task.text} />
        ))}
      </ul>
    </div>
  );
};
