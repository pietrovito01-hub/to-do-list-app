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
      <div className="mb-6 flex gap-2 justify-center">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'all'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All ({todos.length})
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'active'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Active ({activeCount})
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'completed'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Completed ({completedCount})
        </button>
      </div>

      {/* Todos List */}
      <div className="space-y-2">
        {filteredTodos.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {filter === 'all' && 'No todos yet. Create one to get started!'}
            {filter === 'active' && 'No active todos.'}
            {filter === 'completed' && 'No completed todos yet.'}
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
