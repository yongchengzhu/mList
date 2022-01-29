import { FC } from 'react';
import Alert from '@material-ui/lab/Alert';

import styles from './HOC.module.scss';

interface Props {
  error: string | null;
}

const ErrorMessage: FC<Props> = (props) => {
  const { error } = props;

  return error ? (
    <Alert severity="error">{error}</Alert>
  ) : (
    <div className={styles.hiddenAlert} />
  );
};

export default ErrorMessage;
