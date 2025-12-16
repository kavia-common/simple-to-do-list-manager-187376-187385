import React from 'react';
import TodoItem from './TodoItem';

/**
 * PUBLIC_INTERFACE
 * TodoList renders a list of TodoItem components or an empty state.
 */
export default function TodoList({ items, onToggle, onSaveEdit, onDelete }) {
  if (!items || items.length === 0) {
    return <div className="empty" role="status">No tasks yet. Add your first task above.</div>;
  }

  return (
    <ul className="todo-list" aria-live="polite">
      {items.map(item => (
        <li key={item.id} className="todo-item">
          <TodoItem
            item={item}
            onToggle={() => onToggle(item.id)}
            onSave={(text) => onSaveEdit(item.id, text)}
            onDelete={() => onDelete(item.id)}
          />
        </li>
      ))}
    </ul>
  );
}
