function TaskInput({
  newTask,
  setNewTask,
  addTask,
  selectedPriority,
  setSelectedPriority,
}) {
  return (
    <div className="input-group">
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <select
        value={selectedPriority}
        onChange={(e) => setSelectedPriority(e.target.value)}
      >
        <option value="high">High 🔴</option>
        <option value="medium">Medium 🟡</option>
        <option value="low">Low 🟢</option>
      </select>

      <button onClick={addTask}>Add</button>
    </div>
  );
}

export default TaskInput;
