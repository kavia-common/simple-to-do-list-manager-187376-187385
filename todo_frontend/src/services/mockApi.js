const STORAGE_KEY = 'todos';

function read() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function write(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // storage could be full or disabled; ignore for mock
  }
}

function nowISO() {
  return new Date().toISOString();
}

/**
 * PUBLIC_INTERFACE
 * listTodos returns the array of todos from localStorage.
 */
export async function listTodos() {
  return Promise.resolve(read().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
}

/**
 * PUBLIC_INTERFACE
 * createTodo adds a new todo with id, timestamps and defaults.
 */
export async function createTodo({ text }) {
  const todos = read();
  const item = {
    id: cryptoRandomId(),
    text: String(text),
    completed: false,
    createdAt: nowISO(),
    updatedAt: nowISO(),
  };
  const next = [item, ...todos];
  write(next);
  return Promise.resolve(item);
}

/**
 * PUBLIC_INTERFACE
 * updateTodo merges provided fields into the todo by id.
 */
export async function updateTodo(id, payload) {
  const todos = read();
  const idx = todos.findIndex(t => t.id === id);
  if (idx === -1) throw new Error('Not found');
  const updated = { ...todos[idx], ...payload, updatedAt: nowISO() };
  const next = [...todos];
  next[idx] = updated;
  write(next);
  return Promise.resolve(updated);
}

/**
 * PUBLIC_INTERFACE
 * deleteTodo removes the todo by id.
 */
export async function deleteTodo(id) {
  const todos = read();
  const next = todos.filter(t => t.id !== id);
  write(next);
  return Promise.resolve(true);
}

function cryptoRandomId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback simple RNG
  return 'id-' + Math.random().toString(36).slice(2, 10);
}
