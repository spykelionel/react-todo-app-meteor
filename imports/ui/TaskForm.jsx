import { Meteor } from "meteor/meteor";
import React, { useState } from "react";

function TaskForm() {
  const [text, setText] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();

    if (!text) return;

    Meteor.call("tasks.insert", text);
    setText("");
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
