'use client';

import React, { useState } from 'react';
import { Todo } from '@/lib/todo-queries';

interface TodoItemProps {
  todo: Todo;
  onRefresh: () => void;
}

export default function TodoItem({ todo, onRefresh }: TodoItemProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/todos/${todo.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !todo.completed }),
      });

      if (!response.ok) throw new Error('Failed to update task');
      onRefresh();
    } catch (error) {
      console.error('Error toggling task:', error);
      alert('Failed to update task');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!editTitle.trim()) return;
    setIsLoading(true);
    try {
      const response = await fetch(`/api/todos/${todo.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editTitle }),
      });

      if (!response.ok) throw new Error('Failed to update task');
      onRefresh();
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    setIsLoading(true);
    try {
      const response = await fetch(`/api/todos/${todo.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete task');
      onRefresh();
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-slate-800 to-slate-900 rounded-lg shadow-lg border border-slate-700/50 hover:border-slate-600/80 hover:shadow-cyan-500/10 transition-all group backdrop-blur-sm">
      {/* Checkbox */}
      <div className="relative flex-shrink-0">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          disabled={isLoading}
          className="w-6 h-6 cursor-pointer appearance-none border-2 border-slate-600 rounded-md bg-slate-900 checked:bg-gradient-to-br checked:from-blue-500 checked:to-cyan-500 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 transition-all"
        />
        {todo.completed && (
          <svg className="absolute inset-0 w-6 h-6 text-white pointer-events-none" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
      </div>

      {/* Title */}
      {isEditing ? (
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleUpdate()}
          className="flex-1 px-3 py-2 bg-slate-900 border border-cyan-500 rounded-md text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          autoFocus
          disabled={isLoading}
        />
      ) : (
        <span
          className={`flex-1 cursor-pointer text-lg transition-all ${
            todo.completed
              ? 'line-through text-slate-600'
              : 'text-slate-100'
          }`}
          onClick={() => setIsEditing(true)}
        >
          {todo.title}
        </span>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {isEditing ? (
          <>
            <button
              onClick={handleUpdate}
              disabled={isLoading}
              className="px-3 py-1 text-sm bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-md disabled:opacity-50 transition-all font-medium"
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditTitle(todo.title);
              }}
              disabled={isLoading}
              className="px-3 py-1 text-sm bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-md disabled:opacity-50 transition-all font-medium"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              disabled={isLoading}
              className="px-3 py-1 text-sm bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-md disabled:opacity-50 transition-all font-medium"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={isLoading}
              className="px-3 py-1 text-sm bg-gradient-to-r from-red-600/80 to-rose-600/80 hover:from-red-500 hover:to-rose-500 text-white rounded-md disabled:opacity-50 transition-all font-medium"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}
