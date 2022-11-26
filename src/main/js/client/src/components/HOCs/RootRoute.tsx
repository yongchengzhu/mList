// @ts-nocheck
import { FC } from 'react';
import { Route } from 'react-router';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LocationDescriptor } from 'history';
import { RootState } from '../../models/states';

const RootRoute: FC<any> = () => {
  const isLoggedIn: boolean = useSelector(
    (state: RootState) => state.auth.isLoggedIn
  );
  return isLoggedIn ? <Outlet /> : <Navigate to="/signin" />;
};

export default RootRoute;
