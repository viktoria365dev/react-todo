function TaskInput({ newTask, setNewTask, addTask }) {
  return (
    <div>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Add</button>
    </div>
  );
}

export default TaskInput;
