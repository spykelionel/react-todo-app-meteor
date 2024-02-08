import React from "react";

const Task = ({ task, onCheckBoxClicked }) => {
  return (
    <>
      <li>
        <input
          type="checkbox"
          name="task"
          id="task"
          checked={task.isChecked}
          onChange={() => onCheckBoxClicked(task)}
          readOnly
        />
        <label htmlFor="task">{task.text}</label>
      </li>
    </>
  );
};

export default Task;
