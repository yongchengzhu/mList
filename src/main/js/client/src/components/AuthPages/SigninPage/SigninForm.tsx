import React, { FC } from 'react';
import { InjectedFormProps, reduxForm, Field } from 'redux-form';
import SubmitButton from '../../HOCs/SubmitButton';
import { useSelector } from 'react-redux';
import { RootState } from '../../../models/states';
import ErrorMessage from '../../HOCs/ErrorMessage';

const SigninForm: FC<InjectedFormProps> = (props) => {
  const { loading, error } = useSelector((state: RootState) => state.auth);

  return (
    <form onSubmit={props.handleSubmit}>
      <ErrorMessage error={error} />
      
      <label htmlFor="emailOrUsername">Email / Username:</label>
      <Field
        component="input"
        type="text"
        id="emailOrUsername"
        name="emailOrUsername"
        autoFocus
      />
      <label htmlFor="password">Password:</label>
      <Field component="input" type="password" id="password" name="password" />
      <SubmitButton loading={loading} />
    </form>
  );
};

export default reduxForm({
  form: 'signin',
})(SigninForm);
