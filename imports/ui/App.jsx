import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import React, { useState } from "react";
import { TasksCollection } from "../db/TasksCollection";
import LoginForm from "./LoginForm";
import Task from "./Task";
import TaskForm from "./TaskForm";

export const App = () => {
  const [hideCompleted, setHideCompleted] = useState(false);
  const user = useTracker(() => Meteor.user());

  const toggleChecked = ({ _id, isChecked }) =>
    Meteor.call("tasks.setIsChecked", _id, !isChecked);

  const onDelete = ({ _id }) => Meteor.call("tasks.remove", _id);
  const hideCompletedFilter = { isChecked: { $ne: true } };

  const userFilter = user ? { userId: user._id } : {};

  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

  const { tasks, pendingTasksCount, isLoading } = useTracker(() => {
    const noDataAvailable = { tasks: [], pendingTasksCount: 0 };
    if (!Meteor.user()) {
      return noDataAvailable;
    }
    const handler = Meteor.subscribe("tasks");

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    const tasks = TasksCollection.find(
      hideCompleted ? pendingOnlyFilter : userFilter,
      {
        sort: { createdAt: -1 },
      }
    ).fetch();
    const pendingTasksCount = TasksCollection.find(pendingOnlyFilter).count();

    return { tasks, pendingTasksCount };
  });

  const pendingTasksTitle = `${
    pendingTasksCount ? ` (${pendingTasksCount})` : ""
  }`;

  const logout = () => Meteor.logout();
  return (
    <div className="app">
      {user ? (
        <>
          <header>
            <div className="app-bar">
              <div className="app-header">
                <h1>📝️ To Do List {pendingTasksTitle}</h1>
              </div>
              <div className="user" onClick={logout}>
                {user.username || user.profile.name}
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
            {isLoading ? <div className="loading">loading...</div> : <> </>}

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
