import { useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
import { createTask } from "./utils/taskHelpers.js";
import Board from "./components/Board.jsx";
import TaskForm from "./components/TaskForm.jsx";
import Modal from "./components/Modal.jsx";

export default function App() {
  // tasks is the ONLY state that matters for the board's data.
  // Everything else (Board, Column, Card) just receives it as props.
  const [tasks, setTasks] = useLocalStorage("kanban-tasks", []);

  // Whether the "add task" modal is open. This is UI state, separate
  // from the task data itself, so it lives here rather than inside useLocalStorage.
  const [isFormOpen, setIsFormOpen] = useState(false);

  function handleAddTask(taskInput) {
    const newTask = createTask(taskInput);
    // Never mutate state directly (e.g. tasks.push(...)).
    // Always build a new array so React knows something changed.
    setTasks([...tasks, newTask]);
    setIsFormOpen(false);
  }

  function handleMoveTask(taskId, newStatus) {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  }

  function handleDeleteTask(taskId) {
    setTasks(tasks.filter((task) => task.id !== taskId));
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Kanban Board</h1>
        <button className="btn-primary" onClick={() => setIsFormOpen(true)}>
          + Add Task
        </button>
      </header>

      <Board
        tasks={tasks}
        onMoveTask={handleMoveTask}
        onDeleteTask={handleDeleteTask}
      />

      {isFormOpen && (
        <Modal onClose={() => setIsFormOpen(false)}>
          <TaskForm
            onSubmit={handleAddTask}
            onCancel={() => setIsFormOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}
