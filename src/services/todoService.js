import { useMutation, useInfiniteQuery } from 'react-query';

import { addTodo, getTodos, removeTodo } from './apiService';

export function useGetTodos(variables) {
  return useInfiniteQuery(
    'todos',
    ({ pageParam }) =>
      getTodos({ ...variables, nextToken: pageParam }).then(response => ({
        items: response.data.listTodos.items,
        nextToken: response.data.listTodos.nextToken,
      })),
    {
      onError: console.log,
      getNextPageParam: lastPage => lastPage?.nextToken,
    },
  );
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
