import React, { useState, useEffect } from 'react';
import './App.css';
import TodoApp from './components/TodoApp';

/**
 * PUBLIC_INTERFACE
 * App is the root component. It manages theme (light/dark) state and renders the TodoApp.
 * - Toggles theme which is applied via [data-theme] on documentElement.
 * - Keeps accessibility in mind for the toggle button aria-label state.
 */
function App() {
  const [theme, setTheme] = useState('light');

  // Apply theme to the document element for CSS variables to take effect.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="App">
      <header className="app-header-surface">
        <div className="container">
          <div className="app-header">
            <h1 className="title" aria-label="To-do application title">Todo Manager</h1>
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>
          </div>
          <TodoApp />
        </div>
      </header>
    </div>
  );
}

export default App;
