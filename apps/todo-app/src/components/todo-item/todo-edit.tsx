import React, { useState } from 'react';
import { TodoEditProps } from '../../types/todo';

export const TodoEdit: React.FC<TodoEditProps> = ({ todo, onSave, onCancel }) => {
  const [editText, setEditText] = useState(todo.text);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSave(editText);
    } else if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center animate-fade-in px-1">
      <input
        value={editText}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="w-full sm:flex-1 border-b border-primary-light px-2 py-1 outline-none text-base sm:text-lg mb-2 sm:mb-0 focus:border-primary transition-colors"
        autoFocus
      />
      <div className="flex space-x-2 w-full sm:w-auto justify-end sm:ml-2 mt-2 sm:mt-0">
        <button
          onClick={() => onSave(editText)}
          className="px-3 py-1 rounded text-sm bg-primary text-white hover:bg-primary-dark transition-all duration-200 transform hover:scale-105 flex-1 sm:flex-initial"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="px-3 py-1 rounded text-sm border border-gray-300 hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 flex-1 sm:flex-initial"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};