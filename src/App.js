//  keep your imports, add useEffect
import React, { useState, useEffect } from 'react';   // ← added useEffect
import './App.css';
import AddTaskForm from './AddTaskForm';

function App() {
  //  add theme state and logic at the top
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('theme');
    if (stored) return stored;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  // your existing states
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Handler to add a new task
  const handleAddTask = async (taskData) => {
    try {
      const newTask = {
        id: Date.now(),
        ...taskData,
        completed: false,
        created_at: new Date().toISOString()
      };
      setTasks(prevTasks => [...prevTasks, newTask]);
      setShowForm(false);
      console.log('Task added successfully:', newTask);
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  };

  //  update your return JSX — add header + theme toggle
  return (
    <div className="app">
      <header className="header">
        <h1 className="header__title">To-Do List Planner</h1>

        {/* Theme toggle button */}
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </header>

      {showForm && (
        <AddTaskForm onAddTask={handleAddTask} />
      )}

      <h2>Your Tasks ({tasks.length})</h2>
      {tasks.length === 0 ? (
        <p>No tasks yet. Add your first task above!</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task.id} className="task-item">
              <strong>{task.title}</strong>
              <span>{task.priority}</span>
              <span>{task.subject}</span>
              {task.due_date && (
                <span>Due: {new Date(task.due_date).toLocaleDateString()}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
