import React, { FC } from 'react';

import styles from './LoadingSpinner.module.scss';

const LoadingSpinner: FC<{}> = () => {
  return <span className={styles.spinner}></span>;
};

export default LoadingSpinner;
