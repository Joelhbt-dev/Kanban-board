// The three columns this board supports. Defined once here so every
// component refers to the same source of truth instead of typing
// "todo" / "in-progress" / "done" as raw strings everywhere.
export const STATUSES = [
  { id: "todo", label: "To Do" },
  { id: "in-progress", label: "In Progress" },
  { id: "done", label: "Done" },
];

export const PRIORITIES = ["low", "medium", "high"];

// crypto.randomUUID() is a built-in browser API - no library needed.
export function createTask({ title, description = "", priority = "medium" }) {
  return {
    id: crypto.randomUUID(),
    title,
    description,
    priority,
    status: "todo",
    createdAt: Date.now(),
  };
}

// Returns only the tasks belonging to one column, sorted high -> low priority.
export function getTasksByStatus(tasks, status) {
  const priorityRank = { high: 0, medium: 1, low: 2 };
  return tasks
    .filter((task) => task.status === status)
    .sort((a, b) => priorityRank[a.priority] - priorityRank[b.priority]);
}
