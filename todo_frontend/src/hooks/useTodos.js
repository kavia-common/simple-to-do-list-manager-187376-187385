import { useEffect, useState, useMemo } from 'react';
import * as api from '../services/api';
import * as mockApi from '../services/mockApi';

/**
 * PUBLIC_INTERFACE
 * useTodos manages todo list state and exposes CRUD operations.
 * It automatically selects between real API and mock API based on env flags.
 */
export default function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const featureFlags = (process.env.REACT_APP_FEATURE_FLAGS || '').split(',').map(s => s.trim().toUpperCase()).filter(Boolean);
  const BASE = (process.env.REACT_APP_API_BASE || process.env.REACT_APP_BACKEND_URL || '').trim();
  const useMock = !BASE || featureFlags.includes('USE_MOCK_API');

  const svc = useMemo(() => (useMock ? mockApi : api), [useMock]);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await svc.listTodos();
      setTodos(data);
    } catch (e) {
      setError('Failed to load todos.');
      // Fallback to mock if real API fails unexpectedly
      if (!useMock) {
        try {
          const fallback = await mockApi.listTodos();
          setTodos(fallback);
          setError('(Using mock due to API error)');
        } catch {
          // ignore
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useMock]);

  // PUBLIC_INTERFACE
  const addTodo = async (text) => {
    setError('');
    try {
      const created = await svc.createTodo({ text });
      setTodos(prev => [created, ...prev]);
    } catch {
      setError('Failed to add todo.');
    }
  };

  // PUBLIC_INTERFACE
  const toggleComplete = async (id) => {
    setError('');
    try {
      const target = todos.find(t => t.id === id);
      if (!target) return;
      const updated = await svc.updateTodo(id, { completed: !target.completed });
      setTodos(prev => prev.map(t => (t.id === id ? updated : t)));
    } catch {
      setError('Failed to update todo.');
    }
  };

  // PUBLIC_INTERFACE
  const saveEdit = async (id, text) => {
    setError('');
    try {
      const updated = await svc.updateTodo(id, { text });
      setTodos(prev => prev.map(t => (t.id === id ? updated : t)));
    } catch {
      setError('Failed to save changes.');
    }
  };

  // PUBLIC_INTERFACE
  const deleteTodo = async (id) => {
    setError('');
    try {
      await svc.deleteTodo(id);
      setTodos(prev => prev.filter(t => t.id !== id));
    } catch {
      setError('Failed to delete todo.');
    }
  };

  return { todos, loading, error, addTodo, toggleComplete, saveEdit, deleteTodo };
}
