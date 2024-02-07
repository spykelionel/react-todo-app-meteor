import { useTracker } from "meteor/react-meteor-data";
import React from "react";
import { TasksCollection } from "../api/TasksCollection";
import Task from "./Task";

export const App = () => {
  const tasks = useTracker(() => TasksCollection.find({}).fetch());
  return (
    <div>
      <h1>Welcome to Meteor!</h1>
      <ul>
        {tasks.map((task) => (
          <Task key={task._id} title={task.text} />
        ))}
      </ul>
    </div>
  );
};
