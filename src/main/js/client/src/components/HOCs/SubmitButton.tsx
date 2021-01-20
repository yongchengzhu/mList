import React, { FC } from 'react';
import { Button, LinearProgress } from '@material-ui/core';

import styles from './HOC.module.scss';
import { useHOCStyles } from './common';

interface Props {
  loading: boolean;
  className?: any;
}

const SubmitButton: FC<Props> = (props) => {
  const classes = useHOCStyles();
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