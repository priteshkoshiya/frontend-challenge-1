import { selector } from 'recoil';
import { todoFilterState, todosState } from './atoms';
import { Todo } from '../types';

export const filteredTodosSelector = selector<Todo[]>({
  key: 'filteredTodosSelector',
  get: ({ get }) => {
    const filter = get(todoFilterState);
    const todos = get(todosState);

    let filteredTodos;
    switch (filter) {
      case 'active':
        filteredTodos = todos.filter(todo => !todo.completed);
        break;
      case 'completed':
        filteredTodos = todos.filter(todo => todo.completed);
        break;
      default:
        filteredTodos = todos;
    }

    return [...filteredTodos].sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    });
  },
});

export const todoStatsSelector = selector({
  key: 'todoStatsSelector', get: ({ get }) => {
    const todos = get(todosState);
    const totalCount = todos.length;
    const completedCount = todos.filter(todo => todo.completed).length;
    const incompleteCount = totalCount - completedCount;

    return {
      totalCount,
      completedCount,
      incompleteCount,
      percentComplete: totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100),
    };
  },
});