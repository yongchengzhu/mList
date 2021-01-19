import React, { FC } from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';

import styles from './CreateBookForm.module.scss';
import SubmitButton from '../../HOCs/SubmitButton';
import { useSelector, connect, useDispatch } from 'react-redux';
import { RootState } from '../../../models/states';
import CommonForm from './CommonForm';
import { Button, makeStyles } from '@material-ui/core';
import { bookCreateModalCloseAction } from '../../../redux/actions/book/modal';

const useStyles = makeStyles({
  button: {
    'border-radius': 0,
    // 'background-color': '#fff',
    'height': '40px',
    'width': '120px',
  }
});

let CreateBookForm: FC<InjectedFormProps> | any = (props: { handleSubmit: ((event: React.FormEvent<HTMLFormElement>) => void) | undefined; }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    creating: loading, 
    createError: error 
  } = useSelector((state: RootState) => state.book);

  return (
    <form className={styles.form} onSubmit={props.handleSubmit}>
      <CommonForm error={error} />
      <div className={styles.modalFooter}>
        <SubmitButton loading={loading} className={styles.button}>Add Book</SubmitButton>
        <Button
          onClick={() => dispatch(bookCreateModalCloseAction())}
          className={classes.button} 
          variant="contained"
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