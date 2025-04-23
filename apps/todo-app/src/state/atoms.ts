import { atom, AtomEffect } from 'recoil';
import { Todo } from '../types';
import { loadTodos, saveTodos, clearTodos } from '../utils/storage';

const localStorageTodosEffect: AtomEffect<Todo[]> = ({ setSelf, onSet }) => {
  setSelf(loadTodos());

  onSet((newTodos, _, isReset) => {
    if (isReset) {
      clearTodos();
    } else {
      saveTodos(newTodos);
    }
  });
};

export const todosState = atom<Todo[]>({
  key: 'todosState',
  default: [],
  effects: [localStorageTodosEffect]
});

export const newTodoInputState = atom<string>({
  key: 'newTodoInputState',
  default: '',
});

export const editTodoState = atom<{ id: string, text: string; } | null>({
  key: 'editTodoState',
  default: null,
});

export type FilterType = 'all' | 'active' | 'completed';

export const todoFilterState = atom<FilterType>({
  key: 'todoFilterState',
  default: 'all',
});