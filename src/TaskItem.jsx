function TaskItem({
  task,
  editingIndex,
  editingText,
  setEditingText,
  toggleTask,
  deleteTask,
  startEditing,
  saveEdit,
  cancelEdit,
  editingPriority,
  setEditingPriority,
}) {
  return (
    <li className={`task ${task.priority} ${task.justAdded ? "bounce" : ""}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
      />

      {editingIndex === task.id ? (
        <>
          <input
            type="text"
            value={editingText}
            onChange={(e) => setEditingText(e.target.value)}
          />
          <select
            value={editingPriority}
            onChange={(e) => setEditingPriority(e.target.value)}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <div className="actions">
            <button onClick={() => saveEdit(task.id)}>Save</button>
            <button onClick={cancelEdit}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <span className={task.completed ? "completed" : ""}>{task.text}</span>
          <div className="actions">
            <button className="delete-btn" onClick={() => deleteTask(task.id)}>
              Delete
            </button>
            <button onClick={() => startEditing(task.id)}>Edit</button>
          </div>
        </>
      )}
    </li>
  );
}

export default TaskItem;
