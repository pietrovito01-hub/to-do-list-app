'use client';

import React, { useState, useEffect } from 'react';
import { Todo } from '@/lib/todo-queries';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onRefresh: () => void;
}

export default function TodoList({ todos, onRefresh }: TodoListProps) {
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    const filtered = todos.filter((todo) => {
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true;
    });
    setFilteredTodos(filtered);
  }, [todos, filter]);

  const completedCount = todos.filter((t) => t.completed).length;
  const activeCount = todos.length - completedCount;

  return (
    <div className="w-full max-w-2xl">
      {/* Filter Buttons */}
      <div className="mb-6 flex gap-2 justify-center flex-wrap">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            filter === 'all'
              ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-cyan-500/20'
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700 border border-slate-700'
          }`}
        >
          All ({todos.length})
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            filter === 'active'
              ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-cyan-500/20'
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700 border border-slate-700'
          }`}
        >
          Active ({activeCount})
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            filter === 'completed'
              ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-cyan-500/20'
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700 border border-slate-700'
          }`}
        >
          Completed ({completedCount})
        </button>
      </div>

      {/* Todos List */}
      <div className="space-y-3">
        {filteredTodos.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            <div className="text-5xl mb-4">✨</div>
            {filter === 'all' && 'No tasks yet. Create one to get started!'}
            {filter === 'active' && 'No active tasks. Great job!'}
            {filter === 'completed' && 'No completed tasks yet.'}
          </div>
        ) : (
          filteredTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onRefresh={onRefresh} />
          ))
        )}
      </div>
    </div>
  );
}
