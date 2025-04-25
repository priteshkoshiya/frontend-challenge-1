import React from 'react';
import { TodoItemProps } from '../../types/todo';
import { useTodoItem } from '../../hooks/use-todo-item';
import { TodoDisplay } from './todo-display';
import { TodoEdit } from './todo-edit';

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const {
    isDeleting,
    isEditing,
    toggleTodo,
    deleteTodo,
    startEditing,
    saveEdit,
    cancelEdit,
  } = useTodoItem(todo);

  return (
    <div
      className={`border-b border-gray-200 py-3 hover:bg-gray-50 transition-all duration-300 group pl-1
        ${
          isDeleting
            ? 'opacity-0 transform -translate-x-full py-0 overflow-hidden'
            : 'opacity-100'
        }
        animate-fade-in-down`}
    >
      {isEditing ? (
        <TodoEdit
          todo={todo}
          onSave={saveEdit}
          onCancel={cancelEdit}
        />
      ) : (
        <TodoDisplay
          todo={todo}
          onToggle={toggleTodo}
          onEdit={startEditing}
          onDelete={deleteTodo}
        />
      )}
    </div>
  );
};