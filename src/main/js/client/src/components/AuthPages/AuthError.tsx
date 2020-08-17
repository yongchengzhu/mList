import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../models/states';

const AuthError: FC<{}> = () => {
  const error = useSelector((state: RootState) => state.auth.error);

  return error ? <div>{error}</div> : null;
};

export default AuthError;
