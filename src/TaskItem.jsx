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
  editingCategory,
  setEditingCategory,
}) {
  const isEditing = editingIndex === task.id;

  return (
    <li
      className={`task ${task.priority} ${task.justAdded ? "bounce" : ""} ${
        task.completed ? "completed" : ""
      }`}
    >
      {isEditing ? (
        <div className="edit-mode">
          <input
            type="text"
            value={editingText}
            onChange={(e) => setEditingText(e.target.value)}
          />

          <select
            value={editingPriority}
            onChange={(e) => setEditingPriority(e.target.value)}
          >
            <option value="high">🔴 High</option>
            <option value="medium">🟡 Medium</option>
            <option value="low">🟢 Low</option>
          </select>

          <select
            value={editingCategory}
            onChange={(e) => setEditingCategory(e.target.value)}
          >
            <option value="general">General</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="shopping">Shopping</option>
          </select>

          <div className="actions">
            <button onClick={() => saveEdit(task.id)}>Save</button>
            <button onClick={cancelEdit}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <div className="task-main">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <span>{task.text}</span>
            <span className={`category-label ${task.category}`}>
              {task.category}
            </span>
          </div>

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
