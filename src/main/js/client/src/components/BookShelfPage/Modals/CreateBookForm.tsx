import React, { FC } from 'react';
import { reduxForm, InjectedFormProps } from 'redux-form';

import styles from './CreateEditForm.module.scss';
import SubmitButton from '../../HOCs/SubmitButton';
import { useSelector, connect, useDispatch } from 'react-redux';
import { RootState } from '../../../models/states';
import CommonForm from './CommonForm';
import { Button } from '@material-ui/core';
import { bookCreateModalCloseAction } from '../../../redux/actions/book/modal';
import { useStyles } from './common';

let CreateBookForm: FC<InjectedFormProps> | any = (props: { handleSubmit: ((event: React.FormEvent<HTMLFormElement>) => void) | undefined; }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    creating: loading, 
    createError: error 
  } = useSelector((state: RootState) => state.book);

  return (
    <form className={styles.form} onSubmit={props.handleSubmit}>
      <CommonForm error={error}>Add Book</CommonForm>
      <div className={styles.modalFooter}>
        <SubmitButton loading={loading} className={styles.button}>Add Book</SubmitButton>
        <Button
          onClick={() => dispatch(bookCreateModalCloseAction())}
          className={classes.button}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

CreateBookForm = reduxForm({
  form: 'signin',
})(CreateBookForm);

CreateBookForm = connect(
  (state: RootState) => ({
    initialValues: state.book.formState
  })
)(CreateBookForm);

export default CreateBookForm;