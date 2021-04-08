import React from 'react';
import { TextInput, View } from 'react-native';
import { Field } from 'formik';

import { FieldErrorMessage } from '../FieldErrorMessage';

export function TextInputField({ name, ...props }) {
  return (
    <View>
      <Field name={name}>
        {({ field: { value }, form: { setFieldValue } }) => (
          <TextInput
            {...props}
            value={value}
            onChangeText={newValue => setFieldValue(name, newValue)}
          />
        )}
      </Field>
      <FieldErrorMessage name={name} />
    </View>
  );
}
