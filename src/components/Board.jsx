import { STATUSES } from "../utils/taskHelpers.js";
import Column from "./Column.jsx";

/**
 * Board doesn't hold any state of its own - it just receives `tasks`
 * and the two handler functions from App, and passes them further down.
 * This pattern (data + handlers flowing down as props) is the core of
 * how React apps share state across components.
 */
export default function Board({ tasks, onMoveTask, onDeleteTask }) {
  return (
    <div className="board">
      {STATUSES.map((status) => (
        <Column
          key={status.id}
          status={status}
          tasks={tasks}
          onMoveTask={onMoveTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
}
