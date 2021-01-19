import React, { FC } from 'react';
import { InjectedFormProps, Field, reduxForm } from 'redux-form';
import { useSelector, connect, useDispatch } from 'react-redux';
import { RootState } from '../../../models/states';

import styles from './CreateEditForm.module.scss';
import SubmitButton from '../../HOCs/SubmitButton';
import CommonForm from './CommonForm';
import { Button } from '@material-ui/core';
import { bookEditModalCloseAction } from '../../../redux/actions/book/modal';
import { useStyles } from './common';

let EditBookForm: FC<InjectedFormProps> | any = (props: { handleSubmit: ((event: React.FormEvent<HTMLFormElement>) => void) | undefined; }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { 
    editing: loading, 
    editError: error 
  } = useSelector((state: RootState) => state.book);

  return (
    <form className={styles.form} onSubmit={props.handleSubmit}>
      <CommonForm edit error={error}>Edit Book</CommonForm>
      <div className={styles.modalFooter}>
        <SubmitButton loading={loading} className={styles.button}>Edit Book</SubmitButton>
        <Button
          onClick={() => dispatch(bookEditModalCloseAction())}
          className={classes.button}
        >
          Cancel
        </Button>
      </div>
      {/* <div>
        <label htmlFor="is-read">Read New Chapter</label>
        <span>
          <Field name="is-read" id="is-read" component="input" type="checkbox"/>
        </span>
      </div> */}

      {/* <SubmitButton className={styles.button} loading={loading}>Edit Book</SubmitButton> */}
    </form>
  );
};

EditBookForm = reduxForm({
  form: 'signin',
})(EditBookForm);

EditBookForm = connect(
  (state: RootState) => ({
    initialValues: state.context
  })
)(EditBookForm);

export default EditBookForm;