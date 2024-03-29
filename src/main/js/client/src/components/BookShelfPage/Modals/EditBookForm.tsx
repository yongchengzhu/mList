import { FC, FormEvent } from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { useSelector, connect, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { RootState } from '../../../models/states';

import styles from './CreateEditDeleteForm.module.scss';
import SubmitButton from '../../HOCs/SubmitButton';
import CommonForm from './CommonForm';
import { bookEditModalCloseAction } from '../../../redux/actions/book/modal';
import { useFormStyles } from './common';

let EditBookForm: FC<InjectedFormProps> | any = (props: {
  handleSubmit: ((event: FormEvent<HTMLFormElement>) => void) | undefined;
}) => {
  const dispatch = useDispatch();
  const classes = useFormStyles();
  const { handleSubmit } = props;
  const { editing: loading, editError: error } = useSelector(
    (state: RootState) => state.book
  );

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <CommonForm edit error={error}>
        Edit Book
      </CommonForm>
      <div className={styles.modalFooter}>
        <SubmitButton loading={loading} className={styles.button}>
          Edit Book
        </SubmitButton>
        <Button
          onClick={() => dispatch(bookEditModalCloseAction())}
          className={classes.button}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

EditBookForm = reduxForm({
  form: 'signin',
})(EditBookForm);

EditBookForm = connect((state: RootState) => ({
  initialValues: state.context,
}))(EditBookForm);

export default EditBookForm;
