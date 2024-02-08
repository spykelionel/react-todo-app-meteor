import { useTracker } from "meteor/react-meteor-data";
import React from "react";
import { TasksCollection } from "../api/TasksCollection";
import Task from "./Task";
import TaskForm from "./TaskForm";

export const App = () => {
  const tasks = useTracker(() =>
    TasksCollection.find({}, { sort: { createdAt: -1 } }).fetch()
  );
  const toggleChecked = ({ _id, isChecked }) => {
    TasksCollection.update(_id, {
      $set: {
        isChecked: !isChecked,
      },
    });
  };

  const onDelete = ({ _id }) => {
    TasksCollection.remove(_id);
  };

  return (
    <div>
      <h1>Welcome to Meteor!</h1>
      <TaskForm />
      <ul>
        {tasks.map((task) => (
          <Task
            onCheckBoxClicked={toggleChecked}
            onDeleteClick={onDelete}
            key={task._id}
            task={task}
          />
        ))}
      </ul>
    </div>
  );
};
