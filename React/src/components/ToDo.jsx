import { useState } from "react";

function TodoList() {
  const [tasks, setTasks] = useState([]); // Хранение списка задач
  const [inputValue, setInputValue] = useState(""); // Хранение текста из поля ввода

  // Добавление задачи
  const addTask = () => {
    if (inputValue.trim() !== "") {
      setTasks([...tasks, { text: inputValue, completed: false }]);
      setInputValue(""); // Очищаем поле ввода
    }
  };

  // Удаление задачи
  const deleteTask = (index) => {
    const newTasks = tasks.filter((elem, i) => i !== index);
    setTasks(newTasks);
  };

  // Переключение статуса выполнения
  const toggleComplete = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  return (
    <div>
      <h1>ToDo List</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Введите задачу"
      />
      <button onClick={addTask}>Добавить</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} style={{ textDecoration: task.completed ? "line-through" : "none" }}>
            {task.text}
            <button onClick={() => toggleComplete(index)}>
              {task.completed ? "❌" : "✔️"}
            </button>
            <button onClick={() => deleteTask(index)}>🗑️</button>
          </li>
        ))}
      </ul>
      <p>Всего задач: {tasks.length}</p>
    </div>
  );
}

export default TodoList;