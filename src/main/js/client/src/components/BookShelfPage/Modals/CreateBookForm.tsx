import React, { FC } from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';

import styles from './CreateBookForm.module.scss';
import SubmitButton from '../../HOCs/SubmitButton';
import { useSelector, connect } from 'react-redux';
import { RootState } from '../../../models/states';
import ErrorMessage from '../../HOCs/ErrorMessage';

let CreateBookForm: FC<InjectedFormProps> | any = (props: { handleSubmit: ((event: React.FormEvent<HTMLFormElement>) => void) | undefined; }) => {
  const { 
    creating: loading, 
    createError: error 
  } = useSelector((state: RootState) => state.book);

  return (
    <form className={styles.form} onSubmit={props.handleSubmit}>
      <ErrorMessage error={error} />

      <label htmlFor="text">Title:</label>
      <Field component="input" type="text" id="title" name="title" autoFocus />

      <label htmlFor="author">Author</label>
      <Field component="input" type="text" id="author" name="author" />

      <label htmlFor="cover">Cover Image</label>
      <Field component="input" type="text" id="cover" name="cover" />

      <label htmlFor="last-chapter-read">Last Chapter Read</label>
      <Field
        component="input"
        type="text"
        id="last-chapter-read"
        name="lastChapterRead"
      />

      <label htmlFor="rating">Rating</label>
      <Field
        component="input"
        type="number"
        id="rating"
        name="rating"
        min="1"
        max="5"
      />

      <label htmlFor="status">Status</label>
      <Field defaultValue="reading" component="select" id="status" name="status">
        <option value="reading">Reading</option>
        <option value="completed">Completed</option>
        <option value="dropped">Dropped</option>
        <option value="axed">Axed</option>
        <option value="planned">Planned</option>
      </Field>

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