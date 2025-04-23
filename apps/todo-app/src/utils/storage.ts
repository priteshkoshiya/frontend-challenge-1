'use client';

import { Todo } from '../types';

const isBrowser = () => typeof window !== 'undefined';

export function saveTodos(todos: Todo[]): void {
    if (!isBrowser()) return;

    try {
        localStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
        console.error('Error saving todos to localStorage:', error);
    }
}

export function loadTodos(): Todo[] {
    if (!isBrowser()) return [];

    try {
        const savedTodos = localStorage.getItem('todos');
        if (!savedTodos) return [];

        return JSON.parse(savedTodos, (key, value) => {
            if (key === 'createdAt') {
                return new Date(value);
            }
            return value;
        });
    } catch (error) {
        console.error('Error loading todos from localStorage:', error);
        return [];
    }
}

export function clearTodos(): void {
    if (!isBrowser()) return;

    try {
        localStorage.removeItem('todos');
    } catch (error) {
        console.error('Error clearing todos from localStorage:', error);
    }
}