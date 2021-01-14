import React, { FC } from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';

import styles from './CreateBookForm.module.scss';
import SubmitButton from '../../HOCs/SubmitButton';
import { useSelector, connect } from 'react-redux';
import { RootState } from '../../../models/states';
import CommonForm from './CommonForm';

let CreateBookForm: FC<InjectedFormProps> | any = (props: { handleSubmit: ((event: React.FormEvent<HTMLFormElement>) => void) | undefined; }) => {
  const { 
    creating: loading, 
    createError: error 
  } = useSelector((state: RootState) => state.book);

  return (
    <form className={styles.form} onSubmit={props.handleSubmit}>
      <CommonForm error={error} />
      <SubmitButton loading={loading} />
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