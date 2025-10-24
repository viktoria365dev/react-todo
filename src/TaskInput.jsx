function TaskInput({
  newTask,
  setNewTask,
  addTask,
  selectedPriority,
  setSelectedPriority,
  selectedCategory,
  setSelectedCategory,
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
        <option value="high">🔴 High</option>
        <option value="medium">🟡 Medium</option>
        <option value="low">🟢 Low</option>
      </select>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="general">General</option>
        <option value="work">Work</option>
        <option value="personal">Personal</option>
        <option value="shopping">Shopping</option>
      </select>

      <button onClick={addTask}>Add Task</button>
    </div>
  );
}

export default TaskInput;
