// @ts-nocheck
import { FC } from 'react';
import { InjectedFormProps, reduxForm, Field } from 'redux-form';
import { useSelector } from 'react-redux';
import { Button } from '@material-ui/core';

import SubmitButton from '../../HOCs/SubmitButton';
import { RootState } from '../../../models/states';
import ErrorMessage from '../../HOCs/ErrorMessage';
import history from '../../../history';
import styles from '../AuthPages.module.scss';
import { useAuthStyles } from './useAuthStyles';
import { renderTextField, required } from '../common';

const SigninForm: FC<InjectedFormProps> = ({ handleSubmit }) => {
  const classes = useAuthStyles();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.title}>Welcome back to mList</div>
      <ErrorMessage error={error} />
      <div className={styles.fields}>
        <Field
          component={renderTextField}
          type="text"
          id="emailOrUsername"
          name="emailOrUsername"
          className={classes.textField}
          label="Email / Username:"
          validate={[required]}
          autoFocus
        />
        <Field
          component={renderTextField}
          type="password"
          id="password"
          name="password"
          className={classes.textField}
          validate={[required]}
          label="Password:"
        />
      </div>
      <SubmitButton loading={loading}>Sign In</SubmitButton>
      <div className={styles.links}>
        <div className={styles.sub}>Don't have an account?</div>
        <Button
          className={classes.button}
          onClick={() => history.push('/signup')}
        >
          Sign Up
        </Button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'signin',
})(SigninForm);
