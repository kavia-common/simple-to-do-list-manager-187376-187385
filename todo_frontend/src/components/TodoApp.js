import React from 'react';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import useTodos from '../hooks/useTodos';

/**
 * PUBLIC_INTERFACE
 * TodoApp composes the input and list and wires them to the todos hook.
 * Provides loading and error states, and shows counts.
 */
export default function TodoApp() {
  const {
    todos,
    loading,
    error,
    addTodo,
    toggleComplete,
    saveEdit,
    deleteTodo,
  } = useTodos();

  const remaining = todos.filter(t => !t.completed).length;

  return (
    <section aria-labelledby="todo-section-title">
      <h2 id="todo-section-title" className="visually-hidden">Todo List Section</h2>
      <TodoInput onAdd={addTodo} disabled={loading} />
      <div className="list-card" role="region" aria-label="To-do list card">
        <div className="list-header">
          <strong>Tasks</strong>
          <span className="counter" aria-live="polite">{remaining} remaining</span>
        </div>
        {error && <div className="error" role="alert">{error}</div>}
        {loading && <div className="loading" aria-live="polite">Loading…</div>}
        <TodoList
          items={todos}
          onToggle={toggleComplete}
          onSaveEdit={saveEdit}
          onDelete={deleteTodo}
        />
      </div>
    </section>
  );
}
