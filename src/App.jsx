import { useEffect, useState } from "react";
import "./App.css";
import TaskInput from "./TaskInput";
import TaskItem from "./TaskItem";

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem("tasks");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [newTask, setNewTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("medium");
  const [editingPriority, setEditingPriority] = useState("medium");

  const priorityOrder = {
    high: 0,
    medium: 1,
    low: 2,
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (tasks.some((t) => t.justAdded)) {
      const timer = setTimeout(() => {
        setTasks((prev) => prev.map((t) => ({ ...t, justAdded: false })));
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [tasks]);

  function addTask() {
    if (newTask.trim() === "") return;
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: newTask,
        completed: false,
        priority: selectedPriority,
        justAdded: true,
      },
    ]);
    setNewTask("");
    setSelectedPriority("medium");
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function startEditing(id) {
    const task = tasks.find((t) => t.id === id);
    setEditingIndex(id);
    setEditingText(task.text);
    setEditingPriority(task.priority);
  }

  function saveEdit(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, text: editingText, priority: editingPriority }
          : task
      )
    );
    setEditingIndex(null);
    setEditingText("");
    setEditingPriority("medium");
  }

  function cancelEdit() {
    setEditingIndex(null);
    setEditingText("");
    setEditingPriority("medium");
  }

  const sortedTasks = [...tasks].sort((a, b) => {
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  const completed = tasks.filter((t) => t.completed).length;
  const total = tasks.length;
  const progress = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="app-container">
      <h1>My To-Do List</h1>
      <TaskInput
        newTask={newTask}
        setNewTask={setNewTask}
        addTask={addTask}
        selectedPriority={selectedPriority}
        setSelectedPriority={setSelectedPriority}
      />
      <p>You have {tasks.length} tasks</p>
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
      <p>
        {completed} of {total} tasks completed
      </p>

      <ul>
        {sortedTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            editingIndex={editingIndex}
            editingText={editingText}
            setEditingText={setEditingText}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
            startEditing={startEditing}
            saveEdit={saveEdit}
            cancelEdit={cancelEdit}
            editingPriority={editingPriority}
            setEditingPriority={setEditingPriority}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
