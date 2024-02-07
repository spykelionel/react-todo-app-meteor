import React from "react";

const tasks = [
  { _id: 0, title: "My first task" },
  { _id: 1, title: "My second task" },
  { _id: 2, title: "My third task" },
  { _id: 3, title: "My fourth task" },
];

export const App = () => (
  <div>
    <h1>Welcome to Meteor!</h1>
    <Tasks tasks={tasks} />
  </div>
);

const Task = ({ title }) => <li>{title}</li>;

const Tasks = ({ tasks }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <Task key={task._id} title={task.title} />
      ))}
    </ul>
  );
};
