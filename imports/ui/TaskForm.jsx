import React, { useState } from "react";
import { TasksCollection } from "../api/TasksCollection";

function TaskForm() {
  const [text, setText] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();

    TasksCollection.insert({
      text: text.trim(),
      createdAt: new Date(),
    });
  };
  return (
    <form className="task-form" onSubmit={onSubmit}>
      <input
        type="text"
        onChange={(e) => setText(e.target.value)}
        value={text}
        placeholder="Type to add new tasks"
      />

      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
