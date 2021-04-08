import React, { forwardRef } from 'react';
import { Button, View } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { TextInputField } from '../TextInputField';

const defaultInitialValues = { name: '' };

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
});

export const TodoForm = forwardRef(function (
  { initialValues = defaultInitialValues, onSubmit, loading, style },
  ref,
) {
  return (
    <Formik
      innerRef={ref}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <View style={style}>
          <TextInputField
            name="name"
            placeholder="Write anything..."
            editable={!loading}
          />
          <Button title="Submit" onPress={handleSubmit} disabled={loading} />
        </View>
      )}
    </Formik>
  );
});
