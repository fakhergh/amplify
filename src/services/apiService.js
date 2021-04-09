import gql from 'graphql-tag';

import { appSyncClient } from '../client';
import { listTodos } from '../graphql/queries';
import { createTodo, deleteTodo } from '../graphql/mutations';

export function getTodos(variables) {
  return appSyncClient.query({
    query: gql`
      ${listTodos}
    `,
    variables,
  });
}

export function addTodo(variables) {
  return appSyncClient.mutate({
    mutation: gql`
      ${createTodo}
    `,
    variables,
  });
}

export function removeTodo(variables) {
  return appSyncClient.mutate({
    mutation: gql`
      ${deleteTodo}
    `,
    variables,
  });
}
