export default function Card({ task, otherStatuses, onMoveTask, onDeleteTask }) {
  return (
    <div className={`card priority-${task.priority}`}>
      <div className="card-top">
        <span className="priority-badge">{task.priority}</span>
        <button
          className="btn-icon"
          aria-label={`Delete "${task.title}"`}
          onClick={() => onDeleteTask(task.id)}
        >
          ✕
        </button>
      </div>

      <h3 className="card-title">{task.title}</h3>
      {task.description && <p className="card-desc">{task.description}</p>}

      <div className="card-actions">
        {otherStatuses.map((status) => (
          <button
            key={status.id}
            className="btn-secondary"
            onClick={() => onMoveTask(task.id, status.id)}
          >
            Move to {status.label}
          </button>
        ))}
      </div>
    </div>
  );
}
