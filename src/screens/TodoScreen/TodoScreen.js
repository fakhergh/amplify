import React, { useCallback, useEffect, useRef } from 'react';
import {
  ActivityIndicator,
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';

import { useCreateTodo, useDeleteTodo, useGetTodos } from '../../services';
import { TodoForm } from '../../components/TodoForm';
import { useQueryClient } from 'react-query';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  form: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  list: {
    paddingHorizontal: 24,
  },
  item: {
    flexDirection: 'row',
    padding: 8,
    marginVertical: 4,
    backgroundColor: '#F7F7F7',
  },
  itemContent: {
    flex: 1,
  },
  deleteTextButton: {
    color: 'red',
  },
});

export function TodoScreen() {
  const todoFormRef = useRef(null);

  const queryClient = useQueryClient();

  const { status, data, error } = useGetTodos();

  const {
    mutate: createTodoMutation,
    data: createTodoData,
    status: createTodoStatus,
    isSuccess: createTodoSuccess,
  } = useCreateTodo();

  const { mutate: deleteTodoMutation, data: deleteTodoData } = useDeleteTodo();

  const onSubmit = useCallback(
    values => {
      createTodoMutation({ input: values });
    },
    [createTodoMutation],
  );

  // update cache after creation
  useEffect(() => {
    if (createTodoData) {
      queryClient.setQueryData('todos', oldTodos => {
        const newTodos = JSON.parse(JSON.stringify(oldTodos));
        newTodos.listTodos.items.unshift(createTodoData.createTodo);
        return newTodos;
      });
    }
  }, [createTodoData, queryClient]);

  // update cache after deletion
  useEffect(() => {
    if (deleteTodoData) {
      queryClient.setQueryData('todos', oldTodos => {
        const newTodos = JSON.parse(JSON.stringify(oldTodos));

        newTodos.listTodos.items = newTodos.listTodos.items.filter(
          todo => todo.id !== deleteTodoData.deleteTodo.id,
        );

        return newTodos;
      });
    }
  }, [deleteTodoData, queryClient]);

  useEffect(() => {
    if (createTodoSuccess) {
      ToastAndroid.show('New todo item is created', ToastAndroid.LONG);
      todoFormRef.current?.resetForm();
    }
  }, [todoFormRef, createTodoSuccess]);

  if (status === 'loading') {
    return <ActivityIndicator size="small" />;
  }

  if (status === 'error') {
    return <Text>{JSON.stringify(error, null, 5)}</Text>;
  }

  return (
    <View style={styles.container}>
      <TodoForm
        ref={todoFormRef}
        loading={createTodoStatus === 'loading'}
        style={styles.form}
        onSubmit={onSubmit}
      />
      <FlatList
        style={styles.list}
        data={data.listTodos.items}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          return (
            <View style={styles.item}>
              <Text style={styles.itemContent}>{item.name}</Text>
              <TouchableOpacity
                onPress={() => {
                  deleteTodoMutation({ input: { id: item.id } });
                }}>
                <Text style={styles.deleteTextButton}>Delete</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
}
