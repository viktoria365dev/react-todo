import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  function addTask() {
    if (newTask.trim() === "") return;
    setTasks([...tasks, newTask]);
    setNewTask("");
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter(function (_, i) {
      return i !== index;
    });
    setTasks(updatedTasks);
  }

  return (
    <div className="app-container">
      <h1>My To-Do List</h1>
      <input
        type="text"
        value={newTask}
        onChange={function (e) {
          setNewTask(e.target.value);
        }}
      />
      <button onClick={addTask}>Add</button>
      <p>You have {tasks.length} tasks</p>
      <ul>
        {tasks.map(function (task, index) {
          return (
            <li key={index}>
              {task}
              <button
                onClick={function () {
                  deleteTask(index);
                }}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
