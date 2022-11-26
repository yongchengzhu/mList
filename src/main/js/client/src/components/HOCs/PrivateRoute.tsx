// @ts-nocheck
import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AuthState, RootState } from '../../models/states';

const PrivateRoute: FC<any> = ({ children, ...rest }) => {
  const auth: AuthState = useSelector((state: RootState) => state.auth);
  return auth.isLoggedIn ? <Outlet /> : <Navigate to={{
    pathname: '/signin',
    state: { from: location },
  }} />
};

export default PrivateRoute;
