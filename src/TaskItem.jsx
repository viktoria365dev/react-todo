function TaskItem({
  task,
  index,
  editingIndex,
  editingText,
  setEditingText,
  toggleTask,
  deleteTask,
  startEditing,
  saveEdit,
  cancelEdit,
}) {
  return (
    <li>
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
          <span className={task.completed ? "completed" : ""}>{task.text}</span>
          <div className="actions">
            <button className="delete-btn" onClick={() => deleteTask(index)}>
              Delete
            </button>
            <button onClick={() => startEditing(index)}>Edit</button>
          </div>
        </>
      )}
    </li>
  );
}

export default TaskItem;
