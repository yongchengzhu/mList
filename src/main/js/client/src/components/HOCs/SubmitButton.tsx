import { FC } from 'react';
import { Button, LinearProgress } from '@material-ui/core';

import styles from './HOC.module.scss';
import { useHOCStyles } from './common';

interface Props {
  loading: boolean;
  className?: any;
}

const SubmitButton: FC<Props> = (props) => {
  const classes = useHOCStyles();

  const progress = (
    <div className={styles.progress}>
      <LinearProgress color="secondary" />
    </div>
  );

  const submit = (
    <Button
      type="submit"
      variant="contained"
      className={`${classes.button} ${props.className}`}
    >
      {props.children}
    </Button>
  );

  return props.loading ? progress : submit;
};

export default SubmitButton;
