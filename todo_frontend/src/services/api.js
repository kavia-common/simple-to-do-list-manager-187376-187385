const BASE = (process.env.REACT_APP_API_BASE || process.env.REACT_APP_BACKEND_URL || '').trim();
const FEATURE_FLAGS = (process.env.REACT_APP_FEATURE_FLAGS || '').split(',').map(s => s.trim().toUpperCase()).filter(Boolean);

/**
 * PUBLIC_INTERFACE
 * listTodos fetches the list of todos from the backend.
 */
export async function listTodos() {
  if (!BASE) throw new Error('API base not configured');
  const res = await fetch(`${BASE}/todos`, { headers: { 'Content-Type': 'application/json' } });
  if (!res.ok) throw new Error('Failed to fetch todos');
  return res.json();
}

/**
 * PUBLIC_INTERFACE
 * createTodo posts a new todo item to the backend.
 */
export async function createTodo({ text }) {
  if (!BASE) throw new Error('API base not configured');
  const body = JSON.stringify({ text });
  const res = await fetch(`${BASE}/todos`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
  if (!res.ok) throw new Error('Failed to create todo');
  return res.json();
}

/**
 * PUBLIC_INTERFACE
 * updateTodo updates an existing todo item (by id).
 */
export async function updateTodo(id, payload) {
  if (!BASE) throw new Error('API base not configured');
  const res = await fetch(`${BASE}/todos/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Failed to update todo');
  return res.json();
}

/**
 * PUBLIC_INTERFACE
 * deleteTodo removes a todo (by id).
 */
export async function deleteTodo(id) {
  if (!BASE) throw new Error('API base not configured');
  const res = await fetch(`${BASE}/todos/${encodeURIComponent(id)}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete todo');
  return true;
}

// Note: feature flags are consumed by the hook to select mock vs real API.
// We intentionally do not import mock here to avoid env leakage in build-time tree shaking.
