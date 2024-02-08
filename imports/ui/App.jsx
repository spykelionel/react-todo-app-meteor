import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import React, { useState } from "react";
import { TasksCollection } from "../api/TasksCollection";
import LoginForm from "./LoginForm";
import Task from "./Task";
import TaskForm from "./TaskForm";

export const App = () => {
  const [hideCompleted, setHideCompleted] = useState(false);
  const user = useTracker(() => Meteor.user());

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

  const hideCompletedFilter = { isChecked: { $ne: true } };

  const pendingTasksCount = useTracker(() =>
    TasksCollection.find(hideCompletedFilter).count()
  );

  const pendingTasksTitle = `${
    pendingTasksCount ? ` (${pendingTasksCount})` : ""
  }`;

  return (
    <div className="app">
      {user ? (
        <>
          <header>
            <div className="app-bar">
              <div className="app-header">
                <h1>📝️ To Do List {pendingTasksTitle}</h1>
              </div>
            </div>
          </header>

          <div className="main">
            <TaskForm />
            <div className="filter">
              <button onClick={() => setHideCompleted(!hideCompleted)}>
                {hideCompleted ? "Show All" : "Hide Completed"}
              </button>
            </div>
            <ul className="tasks">
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
        </>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};
