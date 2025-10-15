import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");

  function addTask() {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { text: newTask, completed: false }]);
    setNewTask("");
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter(function (_, i) {
      return i !== index;
    });
    setTasks(updatedTasks);
  }

  function toggleTask(index) {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function startEditing(index) {
    setEditingIndex(index);
    setEditingText(tasks[index].text);
  }

  function saveEdit(index) {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, text: editingText };
      }
      return task;
    });
    setTasks(updatedTasks);
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
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(index)}
              />

              {editingIndex === index ? (
                <>
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                  <div className="actions">
                    <button onClick={() => saveEdit(index)}>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <span className={task.completed ? "completed" : ""}>
                    {task.text}
                  </span>
                  <div className="actions">
                    <button
                      className="delete-btn"
                      onClick={() => deleteTask(index)}
                    >
                      Delete
                    </button>
                    <button onClick={() => startEditing(index)}>Edit</button>
                  </div>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
