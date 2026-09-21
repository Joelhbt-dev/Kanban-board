import { useState } from "react";
import { PRIORITIES } from "../utils/taskHelpers.js";

export default function TaskForm({ onSubmit, onCancel }) {
  // Each input's value lives in state - this is what "controlled input" means.
  // React state is the source of truth, not the DOM element itself.
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");

  function handleSubmit(event) {
    event.preventDefault(); // stop the browser's default page-reload behavior
    if (!title.trim()) return; // basic validation

    onSubmit({ title: title.trim(), description: description.trim(), priority });
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>New Task</h2>

      <label htmlFor="title">Title</label>
      <input
        id="title"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="e.g. Fix navbar overlap on mobile"
        autoFocus
        required
      />

      <label htmlFor="description">Description (optional)</label>
      <textarea
        id="description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        rows={3}
      />

      <label htmlFor="priority">Priority</label>
      <select
        id="priority"
        value={priority}
        onChange={(event) => setPriority(event.target.value)}
      >
        {PRIORITIES.map((level) => (
          <option key={level} value={level}>
            {level}
          </option>
        ))}
      </select>

      <div className="form-actions">
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn-primary">
          Add Task
        </button>
      </div>
    </form>
  );
}
