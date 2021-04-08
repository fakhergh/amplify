import { useMutation, useQuery } from 'react-query';

import { addTodo, getTodos, removeTodo } from './apiService';

export function useGetTodos() {
  return useQuery('todos', () => getTodos().then(res => res.data), {
    onError: console.log,
  });
}

export function useCreateTodo() {
  return useMutation(
    'createTodo',
    todoData => addTodo(todoData).then(res => res.data),
    {
      onError: console.log,
    },
  );
}

export function useDeleteTodo() {
  return useMutation(
    'deleteTodo',
    todoData => removeTodo(todoData).then(res => res.data),
    {
      onError: console.log,
    },
  );
}
