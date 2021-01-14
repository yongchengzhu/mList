import React, { FC } from 'react';
import { InjectedFormProps, Field, reduxForm } from 'redux-form';
import { useSelector, connect } from 'react-redux';
import { RootState } from '../../../models/states';

import styles from './EditBookForm.module.scss';
import SubmitButton from '../../HOCs/SubmitButton';
import CommonForm from './CommonForm';

let EditBookForm: FC<InjectedFormProps> | any = (props: { handleSubmit: ((event: React.FormEvent<HTMLFormElement>) => void) | undefined; }) => {
  const { 
    editing: loading, 
    editError: error 
  } = useSelector((state: RootState) => state.book);

  return (
    <form className={styles.form} onSubmit={props.handleSubmit}>
      <CommonForm error={error} />
      <div>
        <label htmlFor="is-read">Read New Chapter</label>
        <span>
          <Field name="is-read" id="is-read" component="input" type="checkbox"/>
        </span>
      </div>

      <SubmitButton loading={loading} />
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