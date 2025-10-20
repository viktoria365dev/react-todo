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

  function addTask() {
    if (newTask.trim() === "") return;
    setTasks([
      ...tasks,
      { text: newTask, completed: false, priority: selectedPriority },
    ]);
    setNewTask("");
    setSelectedPriority("medium");
  }

  function deleteTask(index) {
    setTasks(tasks.filter((_, i) => i !== index));
  }

  function toggleTask(index) {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function startEditing(index) {
    setEditingIndex(index);
    setEditingText(tasks[index].text);
    setEditingPriority(tasks[index].priority);
  }

  function saveEdit(index) {
    setTasks(
      tasks.map((task, i) =>
        i === index
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
  }

  const sortedTasks = [...tasks].sort((a, b) => {
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

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
      <ul>
        {sortedTasks.map((task, index) => (
          <TaskItem
            key={index}
            task={task}
            index={index}
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
