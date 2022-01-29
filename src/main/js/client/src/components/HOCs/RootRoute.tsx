import { FC } from 'react';
import { Route, Redirect } from 'react-router';
import { useSelector } from 'react-redux';
import { LocationDescriptor } from 'history';
import { RootState } from '../../models/states';

export interface RootRouteProps {
  path: string;
  redirectTo: LocationDescriptor;
  defaultTo: LocationDescriptor;
}

const RootRoute: FC<RootRouteProps> = ({ path, redirectTo, defaultTo }) => {
  const isLoggedIn: boolean = useSelector(
    (state: RootState) => state.auth.isLoggedIn
  );

  return (
    <Route path={path}>
      <Redirect to={isLoggedIn ? defaultTo : redirectTo} />;
    </Route>
  );
};

export default RootRoute;
