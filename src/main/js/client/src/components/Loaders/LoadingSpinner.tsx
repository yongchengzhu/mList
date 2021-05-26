import { FC } from 'react';

import styles from './LoadingSpinner.module.scss';

const LoadingSpinner: FC<{}> = () => <span className={styles.spinner} />;

export default LoadingSpinner;
