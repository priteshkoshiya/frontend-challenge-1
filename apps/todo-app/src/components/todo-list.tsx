'use client';

import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { todosState } from '../state/atoms';
import { filteredTodosSelector, todoStatsSelector } from '../state/selectors';
import { TodoItem } from './todo-item/todo-item';
import { subMinutes, subHours, subDays } from 'date-fns';
import { CheckCircle2 } from 'lucide-react';
import { TodoActions } from './todo-actions';
import { TodoInput } from './todo-input';

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useRecoilState(todosState);
  const filteredTodos = useRecoilValue(filteredTodosSelector);
  const stats = useRecoilValue(todoStatsSelector);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 800);

    if (todos.length === 0) {
      const now = new Date();
      setTodos([
        { id: '1', text: 'Milk', completed: false, createdAt: subMinutes(now, 10) },  // 10 minutes ago
        { id: '2', text: 'Butter', completed: false, createdAt: subHours(now, 2) },     // 2 hours ago
        { id: '3', text: 'Cheese', completed: false, createdAt: subDays(now, 1) },    // 1 day ago
      ]);
    }

    return () => clearTimeout(timer);
  }, [setTodos, todos.length, isMounted]);

  if (!isMounted || !isLoaded) {
    return (
      <div className="flex flex-col items-center justify-center h-64 p-6">
        <div className="relative w-16 h-16 mb-4">
          <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-4 border-r-primary border-t-transparent border-b-transparent border-l-transparent animate-spin animation-delay-150"></div>
          <CheckCircle2
            size={24}
            className="absolute inset-0 m-auto text-primary animate-pulse"
          />
        </div>
        <p className="text-gray-500 text-sm animate-pulse">Loading your tasks...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-1 sm:px-2">
      <TodoActions />

      <div className="mt-3 sm:mt-4 border-t border-gray-200 fade-in max-h-[400px] sm:max-h-[450px] overflow-y-auto custom-scrollbar">
        {filteredTodos.length === 0 ? (
          <div className="text-center py-4 text-gray-500 text-sm">
            {stats.totalCount === 0
              ? 'No todos yet. Add one below!'
              : 'No matching todos for the selected filter.'}
          </div>
        ) : (
          filteredTodos.map((todo, index) => (
            <div key={todo.id} className={index === filteredTodos.length - 1 ? 'border-gray-200' : ''}>
              <TodoItem
                todo={todo}
                onToggle={() => {}}
                onDelete={() => {}}
                onEdit={() => {}}
              />
            </div>
          ))
        )}
      </div>

      <TodoInput />
    </div>
  );
};