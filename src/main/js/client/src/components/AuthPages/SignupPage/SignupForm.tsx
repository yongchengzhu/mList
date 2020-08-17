import React, { FC } from 'react';
import { reduxForm, InjectedFormProps, Field } from 'redux-form';

import SubmitButton from '../../HOCs/SubmitButton';
import { useSelector } from 'react-redux';
import { RootState } from '../../../models/states';
import ErrorMessage from '../../HOCs/ErrorMessage';

const SignupForm: FC<InjectedFormProps> = (props) => {
  const { loading, error } = useSelector((state: RootState) => state.auth);

  return (
    <form onSubmit={props.handleSubmit}>
      <ErrorMessage error={error} />

      <label htmlFor="email">Email:</label>
      <Field component="input" id="email" type="text" name="email" autoFocus />

      <label htmlFor="username">Username:</label>
      <Field component="input" id="username" type="username" name="username" />

      <label htmlFor="password">Password:</label>
      <Field component="input" id="password" type="password" name="password" />

      <label htmlFor="confirm-password">Confirm Password</label>
      <Field
        component="input"
        id="confirm-password"
        type="password"
        name="confirm-password"
      />
      <SubmitButton loading={loading} />
    </form>
  );
};

export default reduxForm({
  form: 'signup',
})(SignupForm);
