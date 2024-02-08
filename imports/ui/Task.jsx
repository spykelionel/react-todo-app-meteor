import React from "react";

const Task = ({ task, onCheckBoxClicked, onDeleteClick }) => {
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
        <button onClick={() => onDeleteClick(task)}>&times;</button>
      </li>
    </>
  );
};

export default Task;
