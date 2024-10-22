import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editedTask, setEditedTask] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === '') return;
    setTasks([...tasks, { text: newTask, completed: false }]);
    setNewTask('');
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const addedList = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditedTask(tasks[index].text);
  };

  const updateTask = () => {
    const updatedTasks = tasks.map((task, i) =>
      i === editIndex ? { ...task, text: editedTask } : task
    );
    setTasks(updatedTasks);
    setEditIndex(null);
    setEditedTask('');
  };

  return (
    <div className="app">
      <h1>Todo List</h1>
      <div className="input-group">
        <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Add a new task" />
        <button onClick={addTask}>Add</button>
      </div>

      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : ''}>
            {editIndex === index ? (
              <>
                <input type="text" value={editedTask} onChange={(e) => setEditedTask(e.target.value)} />
                <button onClick={updateTask}>Update</button>
              </>
            ) : (
              <>
                <span onClick={() => addedList(index)}> {task.text}</span>
                <div className="actions">
                  <button onClick={() => startEdit(index)}>Edit</button>
                  <button onClick={() => deleteTask(index)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
