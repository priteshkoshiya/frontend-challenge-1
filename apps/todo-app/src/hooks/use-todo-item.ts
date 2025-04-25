import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { todosState, editTodoState } from '../state/atoms';
import { Todo } from '../types/todo';

export const useTodoItem = (todo: Todo) => {
  const [, setTodos] = useRecoilState(todosState);
  const [editMode, setEditMode] = useRecoilState(editTodoState);
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
  };

  const saveEdit = (text: string) => {
    if (text.trim() !== '') {
      setTodos(prevTodos =>
        prevTodos.map(item =>
          item.id === todo.id ? { ...item, text: text.trim() } : item
        )
      );
      setEditMode(null);
    }
  };

  const cancelEdit = () => {
    setEditMode(null);
  };

  return {
    isDeleting,
    isEditing: editMode?.id === todo.id,
    toggleTodo,
    deleteTodo,
    startEditing,
    saveEdit,
    cancelEdit,
  };
};