import React from 'react';
import { Check, Pencil, Trash, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { TodoDisplayProps } from '../../types/todo';

export const TodoDisplay: React.FC<TodoDisplayProps> = ({
  todo,
  onToggle,
  onEdit,
  onDelete,
}) => {
  const relativeTime = todo.createdAt
    ? formatDistanceToNow(todo.createdAt, { addSuffix: true })
    : '';

  return (
    <div className="flex flex-col">
      <div className="flex items-start">
        <div
          onClick={onToggle}
          className={`border-primary w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center cursor-pointer mr-3 flex-shrink-0 mt-1
            ${todo.completed ? 'bg-primary' : 'hover:bg-primary/10'}`}
          aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {todo.completed && (
            <Check size={17} color="white" className="animate-scale-in" />
          )}
        </div>
        <span
          className={`text-base sm:text-lg break-words transition-all duration-300 ${
            todo.completed ? 'line-through text-gray-400' : 'text-gray-700'
          }`}
          onClick={onEdit}
        >
          {todo.text}
        </span>

        <div className="ml-auto flex items-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200">
          <button
            onClick={onEdit}
            className="p-1 text-gray-500 hover:text-primary"
            aria-label="Edit todo"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={onDelete}
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
  );
};