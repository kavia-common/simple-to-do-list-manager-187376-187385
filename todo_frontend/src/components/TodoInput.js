import React, { useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * TodoInput renders a text input to add a new todo.
 * - Controlled component.
 * - Submits on Enter or button click.
 * - Prevents adding empty or whitespace-only items.
 */
export default function TodoInput({ onAdd, disabled = false }) {
  const [text, setText] = useState('');

  const submit = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setText('');
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="input-row">
      <label htmlFor="todo-input" className="visually-hidden">Add a task</label>
      <input
        id="todo-input"
        className="input"
        placeholder="What needs to be done?"
        aria-label="Task text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={onKeyDown}
        disabled={disabled}
      />
      <button
        type="button"
        className="btn btn-primary"
        onClick={submit}
        disabled={disabled || !text.trim()}
        aria-label="Add task"
      >
        Add
      </button>
    </div>
  );
}
