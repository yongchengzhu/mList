import React, { FC } from 'react';
import { reduxForm, InjectedFormProps, Field } from 'redux-form';
import { useSelector } from 'react-redux';

import SubmitButton from '../../HOCs/SubmitButton';
import { RootState } from '../../../models/states';
import ErrorMessage from '../../HOCs/ErrorMessage';
import styles from '../AuthPages.module.scss';
import { renderTextField, required, passwordsMatch } from '../common';
import { useAuthStyles } from '../SigninPage/useAuthStyles';
import { Button } from '@material-ui/core';
import history from '../../../history';

const SignupForm: FC<InjectedFormProps> = (props) => {
  const classes = useAuthStyles();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  return (
    <form className={styles.form} onSubmit={props.handleSubmit}>
      <div className={styles.title}>Join mList Right Away</div>
      <ErrorMessage error={error} />
      <div className={styles.fields}>
        <Field 
          component={renderTextField}
          className={classes.textField}
          id="email" 
          type="text" 
          name="email" 
          label="Email:"
          validate={[required]}
          autoFocus 
        />
        <Field 
          component={renderTextField}
          className={classes.textField}
          id="username" 
          type="username" 
          name="username"
          label="Username:"
          validate={[required]}
        />
        <Field 
          component={renderTextField}
          className={classes.textField}
          id="password" 
          type="password" 
          name="password"
          label="Password:"
          validate={[required]}
        />
        <Field
          component={renderTextField}
          className={classes.textField}
          id="confirm-password"
          type="password"
          name="confirm-password"
          label="Confirm Password:"
          validate={[required, passwordsMatch]}
        />
      </div>
      <SubmitButton loading={loading} />
      <div className={styles.links}>
        <div className={styles.sub}>Already have an account?</div>
        <Button 
          className={classes.button} 
          onClick={() => history.push('/signin')}
        >
          Sign In
        </Button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'signup',
})(SignupForm);
