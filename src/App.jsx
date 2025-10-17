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

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask() {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { text: newTask, completed: false }]);
    setNewTask("");
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
  }

  function saveEdit(index) {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, text: editingText } : task
      )
    );
    setEditingIndex(null);
    setEditingText("");
  }

  function cancelEdit() {
    setEditingIndex(null);
    setEditingText("");
  }

  return (
    <div className="app-container">
      <h1>My To-Do List</h1>
      <TaskInput newTask={newTask} setNewTask={setNewTask} addTask={addTask} />
      <p>You have {tasks.length} tasks</p>
      <ul>
        {tasks.map((task, index) => (
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
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
