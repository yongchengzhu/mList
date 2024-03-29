import { FC, FormEvent } from 'react';
import { reduxForm, InjectedFormProps } from 'redux-form';

import { useSelector, connect, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import styles from './CreateEditDeleteForm.module.scss';
import SubmitButton from '../../HOCs/SubmitButton';
import { RootState } from '../../../models/states';
import CommonForm from './CommonForm';
import { bookCreateModalCloseAction } from '../../../redux/actions/book/modal';
import { useFormStyles } from './common';

let CreateBookForm: FC<InjectedFormProps> | any = (props: {
  handleSubmit: ((event: FormEvent<HTMLFormElement>) => void) | undefined;
}) => {
  const classes = useFormStyles();
  const dispatch = useDispatch();
  const { handleSubmit } = props;
  const { creating: loading, createError: error } = useSelector(
    (state: RootState) => state.book
  );

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <CommonForm error={error}>Add Book</CommonForm>
      <div className={styles.modalFooter}>
        <SubmitButton loading={loading} className={styles.button}>
          Add Book
        </SubmitButton>
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

CreateBookForm = connect((state: RootState) => ({
  initialValues: state.book.formState,
}))(CreateBookForm);

export default CreateBookForm;
