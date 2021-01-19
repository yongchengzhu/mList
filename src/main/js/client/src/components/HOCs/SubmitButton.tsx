import React, { FC } from 'react';
import { Button, makeStyles, LinearProgress } from '@material-ui/core';

import styles from './HOC.module.scss';

interface Props {
  loading: boolean;
  className?: any;
}

const useStyles = makeStyles({
  button: {
    'border-radius': 0,
    'background-color': '#fff',
    'height': '40px',
  }
});

const SubmitButton: FC<Props> = (props) => {
  const classes = useStyles();
  const renderSubmitButton = () => {
    switch (props.loading) {
      case true:
        return <div className={styles.progress}><LinearProgress color="secondary" /></div>;
      case false:
        // return <div style={{ height: "40px" }}><LinearProgress color="secondary" /></div>;
        return (
        <Button
          type="submit"
          variant="contained" 
          className={`${classes.button} ${props.className}`}
        >
          {props.children}
        </Button>);
    }
  };

  return renderSubmitButton();
};

export default SubmitButton;