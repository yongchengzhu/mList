import React, { FC } from 'react';
import { InjectedFormProps, Field, reduxForm } from 'redux-form';
import { useSelector, connect } from 'react-redux';
import { RootState } from '../../../models/states';

import styles from './EditBookForm.module.scss';
import ErrorMessage from '../../HOCs/ErrorMessage';
import SubmitButton from '../../HOCs/SubmitButton';

let EditBookForm: FC<InjectedFormProps> | any = (props: { handleSubmit: ((event: React.FormEvent<HTMLFormElement>) => void) | undefined; }) => {
  const { 
    editing: loading, 
    editError: error 
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