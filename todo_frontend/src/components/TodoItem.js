import React, { useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * TodoItem displays a single todo with:
 * - Checkbox to toggle completion
 * - Inline edit mode with save/cancel
 * - Delete button
 */
export default function TodoItem({ item, onToggle, onSave, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(item.text);

  const startEdit = () => {
    setDraft(item.text);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setDraft(item.text);
    setIsEditing(false);
  };

  const save = () => {
    const trimmed = draft.trim();
    if (!trimmed || trimmed === item.text) {
      setIsEditing(false);
      return;
    }
    onSave(trimmed);
    setIsEditing(false);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      save();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      cancelEdit();
    }
  };

  return (
    <>
      <input
        id={`chk-${item.id}`}
        className="checkbox"
        type="checkbox"
        checked={!!item.completed}
        onChange={onToggle}
        aria-label={`Mark "${item.text}" as ${item.completed ? 'incomplete' : 'complete'}`}
      />
      <div>
        {isEditing ? (
          <div className="inline-edit">
            <label htmlFor={`edit-${item.id}`} className="visually-hidden">Edit task</label>
            <input
              id={`edit-${item.id}`}
              className="input"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={onKeyDown}
              autoFocus
            />
            <button className="small-btn btn-secondary" onClick={cancelEdit} aria-label="Cancel editing">Cancel</button>
            <button className="small-btn btn-primary" onClick={save} aria-label="Save edit">Save</button>
          </div>
        ) : (
          <label htmlFor={`chk-${item.id}`} className={`todo-text ${item.completed ? 'completed' : ''}`}>
            {item.text}
          </label>
        )}
      </div>
      <div className="item-actions">
        {!isEditing && (
          <button className="small-btn btn-secondary" onClick={startEdit} aria-label={`Edit "${item.text}"`}>
            Edit
          </button>
        )}
        <button className="small-btn btn-danger" onClick={onDelete} aria-label={`Delete "${item.text}"`}>
          Delete
        </button>
      </div>
    </>
  );
}
