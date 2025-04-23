'use client';

import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { todosState, editTodoState } from '../state/atoms';
import { Todo } from '../types';
import { Check, Pencil, Trash, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const [, setTodos] = useRecoilState(todosState);
  const [editMode, setEditMode] = useRecoilState(editTodoState);
  const [editText, setEditText] = useState(todo.text);
  const [isDeleting, setIsDeleting] = useState(false);

  const toggleTodo = () => {
    setTodos(prevTodos =>
      prevTodos.map(item =>
        item.id === todo.id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const deleteTodo = () => {
    setIsDeleting(true);
    setTimeout(() => {
      setTodos(prevTodos => prevTodos.filter(item => item.id !== todo.id));
      if (editMode?.id === todo.id) {
        setEditMode(null);
      }
    }, 300);
  };

  const startEditing = () => {
    setEditMode({ id: todo.id, text: todo.text });
    setEditText(todo.text);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value);
  };

  const saveEdit = () => {
    if (editText.trim() !== '') {
      setTodos(prevTodos =>
        prevTodos.map(item =>
          item.id === todo.id ? { ...item, text: editText.trim() } : item
        )
      );
      setEditMode(null);
    }
  };

  const cancelEdit = () => {
    setEditMode(null);
    setEditText(todo.text);
  };

  const handleEditKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  const isEditing = editMode?.id === todo.id;
  const relativeTime = todo.createdAt ? formatDistanceToNow(todo.createdAt, { addSuffix: true }) : '';

  return (
    <div
      className={`border-b border-gray-200 py-3 hover:bg-gray-50 transition-all duration-300 group pl-1
        ${isDeleting ? 'opacity-0 transform -translate-x-full py-0 overflow-hidden' : 'opacity-100'}
        animate-fade-in-down`}
    >
      {isEditing ? (
        <div className="flex flex-col sm:flex-row items-start sm:items-center animate-fade-in px-1">
          <input
            value={editText}
            onChange={handleEditChange}
            onKeyDown={handleEditKeyPress}
            className="w-full sm:flex-1 border-b border-primary-light px-2 py-1 outline-none text-base sm:text-lg mb-2 sm:mb-0 focus:border-primary transition-colors"
            autoFocus
          />
          <div className="flex space-x-2 w-full sm:w-auto justify-end sm:ml-2 mt-2 sm:mt-0">
            <button
              onClick={saveEdit}
              className="px-3 py-1 rounded text-sm bg-primary text-white hover:bg-primary-dark transition-all duration-200 transform hover:scale-105 flex-1 sm:flex-initial"
            >
              Save
            </button>
            <button
              onClick={cancelEdit}
              className="px-3 py-1 rounded text-sm border border-gray-300 hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 flex-1 sm:flex-initial"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="flex items-start">
            <div
              onClick={toggleTodo}
              className={`border-primary w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center cursor-pointer mr-3 flex-shrink-0 mt-1
                ${todo.completed ? 'bg-primary' : "hover:bg-primary/10"}`}
              aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
            >
              {todo.completed && (<Check size={17} color='white' className="animate-scale-in" />)}
            </div>
            <span
              className={`text-base sm:text-lg break-words transition-all duration-300 ${todo.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}
              onClick={() => startEditing()}
              style={{ wordBreak: 'break-word', maxWidth: 'calc(100% - 5rem)' }}
            >
              {todo.text}
            </span>

            <div className="ml-auto flex items-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200">
              <button
                onClick={startEditing}
                className="p-1 text-gray-500 hover:text-primary"
                aria-label="Edit todo"
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={deleteTodo}
                className="p-1 text-gray-500 hover:text-red-500 ml-1"
                aria-label="Delete todo"
              >
                <Trash size={16} />
              </button>
            </div>
          </div>

          {relativeTime && (
            <div className="text-xs text-gray-400 mt-1 flex items-center pl-8">
              <Clock size={12} className="inline mr-1" />
              <span>{relativeTime}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};