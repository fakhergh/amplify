import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { ErrorMessage } from 'formik';

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 10,
    color: 'red',
  },
});

export function FieldErrorMessage({ name }) {
  return (
    <ErrorMessage name={name}>
      {errorMessage => <Text style={styles.errorMessage}>{errorMessage}</Text>}
    </ErrorMessage>
  );
}
