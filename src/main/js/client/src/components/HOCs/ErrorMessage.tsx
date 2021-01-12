import React, { FC } from 'react';

interface Props {
  error: string | null;
}

const ErrorMessage: FC<Props> = (props) => {
  const { error } = props;

  return error ? <div>{error}</div> : null;
};

export default ErrorMessage;