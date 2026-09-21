import { getTasksByStatus, STATUSES } from "../utils/taskHelpers.js";
import Card from "./Card.jsx";

export default function Column({ status, tasks, onMoveTask, onDeleteTask }) {
  const columnTasks = getTasksByStatus(tasks, status.id);

  // Given the current status, figure out which statuses this column's
  // cards are allowed to move to (used to build the "Move to..." buttons).
  const otherStatuses = STATUSES.filter((s) => s.id !== status.id);

  return (
    <div className="column">
      <div className="column-header">
        <h2>{status.label}</h2>
        <span className="column-count">{columnTasks.length}</span>
      </div>

      <div className="column-body">
        {columnTasks.length === 0 && (
          <p className="empty-hint">No tasks here yet.</p>
        )}

        {columnTasks.map((task) => (
          <Card
            key={task.id}
            task={task}
            otherStatuses={otherStatuses}
            onMoveTask={onMoveTask}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </div>
    </div>
  );
}
