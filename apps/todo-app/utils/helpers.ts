import { Todo } from '../src/types';

export const saveToLocalStorage = (todos: Todo[]) => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  } catch (error) {
    console.error('Error saving to localStorage', error);
  }
};

export const loadFromLocalStorage = (): Todo[] => {
  try {
    if (typeof window !== 'undefined') {
      const storedTodos = localStorage.getItem('todos');
      return storedTodos ? JSON.parse(storedTodos) : [];
    }
    return [];
  } catch (error) {
    console.error('Error loading from localStorage', error);
    return [];
  }
};