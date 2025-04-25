'use client';

import React from 'react';
import { useRecoilState } from 'recoil';
import { todosState, newTodoInputState } from '../state/atoms';
import { v4 as uuidv4 } from 'uuid';
import { Plus } from 'lucide-react';

export const TodoInput: React.FC = () => {
  const [, setTodos] = useRecoilState(todosState);
  const [newTodoText, setNewTodoText] = useRecoilState(newTodoInputState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    setNewTodoText(input.value);
  };

  const handleAddTodo = () => {
    if (newTodoText.trim() !== '') {
      const newTodo = {
        id: uuidv4(),
        text: newTodoText.trim(),
        completed: false,
        createdAt: new Date(),
      };

      setTodos(prevTodos => [...prevTodos, newTodo]);
      setNewTodoText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  const hasValue = newTodoText.trim() !== '';

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-0 mt-6 pt-6">
      <div className="flex-1 flex items-center relative">
        <div
          onClick={handleAddTodo}
          className={`absolute left-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-colors
            ${hasValue ? 'border-primary' : 'border-gray-300'}`}
        >
          <Plus size={16} color={hasValue ? "#7328F6" : "lightgrey"} />
        </div>
        <input
          value={newTodoText}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Add a new task..."
          className="w-full flex-1 py-2 sm:py-3 pl-8 sm:pl-10 text-base sm:text-lg border-none outline-none focus:text-primary transition-colors"
        />
      </div>
      <button
        onClick={handleAddTodo}
        className={`rounded-lg px-4 sm:px-5 py-2 sm:ml-3 transition-all text-sm sm:text-base
          ${hasValue
            ? 'bg-primary text-white hover:bg-primary-dark'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        disabled={!hasValue}
      >
        Add Task
      </button>
    </div>
  );
};