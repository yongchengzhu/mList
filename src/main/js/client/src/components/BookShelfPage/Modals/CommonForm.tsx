import React, { FC } from 'react';
import ErrorMessage from '../../HOCs/ErrorMessage';
import { Field } from 'redux-form';

interface Props {
  error: string | null;
}

const CommonForm: FC<Props> = props => {
  return (
    <>
      <ErrorMessage error={props.error} />

      <label htmlFor="text">Title:</label>
      <Field component="input" type="text" id="title" name="title" autoFocus />

      <label htmlFor="cover">Cover Image:</label>
      <Field component="input" type="text" id="cover" name="cover" />

      <label htmlFor="last-chapter-read">Last Chapter Read:</label>
      <Field
        component="input"
        type="text"
        id="last-chapter-read"
        name="lastChapterRead"
      />

      <label htmlFor="rating">Rating:</label>
      <Field
        component="input"
        type="number"
        id="rating"
        name="rating"
        min="1"
        max="5"
      />

      <label htmlFor="status">Status:</label>
      <Field defaultValue="reading" component="select" id="status" name="status">
        <option value="reading">Reading</option>
        <option value="completed">Completed</option>
        <option value="dropped">Dropped</option>
        <option value="axed">Axed</option>
        <option value="planned">Planned</option>
      </Field>

      <label htmlFor="days-to-wait">Days To Wait:</label>
      <Field
        component="input"
        type="number"
        id="days-to-wait"
        name="daysToWait"
        min="0"
      />
    </>
  );
};

export default CommonForm;