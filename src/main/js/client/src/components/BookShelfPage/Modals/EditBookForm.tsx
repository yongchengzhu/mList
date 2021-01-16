import React, { FC } from 'react';
import { InjectedFormProps, Field, reduxForm } from 'redux-form';
import { useSelector, connect } from 'react-redux';
import { RootState } from '../../../models/states';

import styles from './EditBookForm.module.scss';
import SubmitButton from '../../HOCs/SubmitButton';
import CommonForm from './CommonForm';
import { getCell } from '../../../redux/actions/book/common';
import { TITLE, ID, LANGUAGE, LAST_READ, STATUS, COVER_IMAGE, RATING, LAST_READ_DATE, DAYS_TO_WAIT } from '../common';

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
    initialValues: {
      id             : getCell(state.context.row, ID).innerHTML,
      title          : getCell(state.context.row, TITLE).innerHTML,
      language       : getCell(state.context.row, LANGUAGE).innerHTML,
      cover          : getCell(state.context.row, COVER_IMAGE).innerHTML,
      lastChapterRead: getCell(state.context.row, LAST_READ).innerHTML,
      rating         : getCell(state.context.row, RATING).innerHTML,
      lastReadDate   : getCell(state.context.row, LAST_READ_DATE).innerHTML,
      daysToWait     : getCell(state.context.row, DAYS_TO_WAIT).innerHTML,
      comments       : null,
      status         : getCell(state.context.row, STATUS).innerHTML,
    }
  })
)(EditBookForm);

export default EditBookForm;