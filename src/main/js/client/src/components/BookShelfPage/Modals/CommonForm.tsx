import React, { FC } from 'react';
import ErrorMessage from '../../HOCs/ErrorMessage';

import styles from './CommonForm.module.scss';
import { Field } from 'redux-form';
import { renderTextField, required, rating, renderSelect, renderToggleSwitch } from '../../AuthPages/common';
import { useAuthStyles } from '../../AuthPages/SigninPage/useAuthStyles';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { useDispatch } from 'react-redux';
import { bookDeleteModalOpenAction } from '../../../redux/actions/book/modal';

interface Props {
  error: string | null;
  children: any;
  edit?: boolean;
}

const CommonForm: FC<Props> = props => {
  const classes = useAuthStyles();
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>{props.children}</div>
        {props.edit && (
            <DeleteOutlineIcon 
              className={styles.deleteIcon}
              onClick  ={() => { dispatch(bookDeleteModalOpenAction()) }}
            />
          )
        }
      </div>
      <ErrorMessage error={props.error} />

      <Field
        component={renderTextField}
        type="text"
        id="title"
        name="title"
        className={classes.textField}
        label="Title"
        validate={[required]}
        autoFocus
      />

      <Field
        component={renderTextField}
        type="text"
        id="cover"
        name="cover"
        className={classes.textField}
        label="Cover Image Link"
        validate={[required]}
      />

      <Field
        component={renderTextField}
        type="text"
        id="last-chapter-read"
        name="lastChapterRead"
        className={!props.edit? classes.textField : classes.editLastChapter}
        label="Last Chapter Read"
        validate={[required]}
      />
      {
        props.edit && (
          <Field 
            name="is-read" 
            id="is-read" 
            component={renderToggleSwitch} 
            type="checkbox"
            className={classes.formControlLabel}
          />
          // <FormControlLabel
          //   className={classes.formControlLabel}
          //   control={<PurpleSwitch />}
          //   label="Update Date"
          // />
        )
      }

      <div className={styles.flexContainer}>
        <Field 
          defaultValue="reading" 
          component={renderSelect} 
          id="status" 
          name="status"
          className={classes.formControl}
        />

        <Field
          component={renderTextField}
          type="number"
          id="rating"
          name="rating"
          className={`${classes.textField} ${styles.rating}`}
          label="Rating"
          validate={[required, rating]}
        />
      </div>

      <Field
        component={renderTextField}
        type="number"
        id="days-to-wait"
        name="daysToWait"
        className={classes.textField}
        label="Days To Wait"
      />

      <div className="switch-toggle switch-candy">
        <Field id="cn-radio" name="language" component="input" type="radio" value="cn"/>
        <label htmlFor="cn-radio">CN</label>
        <Field id="kr-radio" name="language" component="input" type="radio" value="kr"/>
        <label htmlFor="kr-radio">KR</label>
        <Field id="jp-radio" name="language" component="input" type="radio" value="jp"/>
        <label htmlFor="jp-radio">JP</label>
        <a />
      </div>      
    </div>
  );
};

export default CommonForm;