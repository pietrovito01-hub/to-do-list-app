'use client';

import { useEffect, useState } from 'react';
import AddTodoForm from '@/components/AddTodoForm';
import TodoList from '@/components/TodoList';
import { Todo } from '@/lib/todo-queries';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/todos');
      if (!response.ok) throw new Error('Failed to fetch todos');
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      console.error('Error fetching todos:', err);
      setError('Failed to load todos. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-1 h-12 bg-gradient-to-b from-blue-400 to-cyan-400 rounded"></div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              TaskFlow
            </h1>
            <div className="w-1 h-12 bg-gradient-to-b from-cyan-400 to-blue-400 rounded"></div>
          </div>
          <p className="text-slate-400 text-lg font-light tracking-wide">
            Manage your tasks with elegance and precision
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-950/30 border border-red-800/50 text-red-300 px-4 py-3 rounded-lg mb-6 backdrop-blur-sm">
            {error}
          </div>
        )}

        {/* Add Todo Form */}
        <AddTodoForm onAdd={fetchTodos} />

        {/* Loading State */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block">
              <div className="animate-spin rounded-full h-12 w-12 border-2 border-slate-600 border-t-cyan-400"></div>
            </div>
            <p className="mt-4 text-slate-500">Loading tasks...</p>
          </div>
        ) : (
          /* Todo List */
          <TodoList todos={todos} onRefresh={fetchTodos} />
        )}
      </div>
    </main>
  );
}
