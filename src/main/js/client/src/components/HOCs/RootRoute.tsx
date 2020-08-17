import React, { FC } from 'react';
import { Route, Redirect } from 'react-router';
import { RootRouteProps } from '../../models/props';
import { useSelector } from 'react-redux';
import { RootState } from '../../models/states';

const RootRoute: FC<RootRouteProps> = (props) => {
  const isLoggedIn: boolean = useSelector(
    (state: RootState) => state.auth.isLoggedIn
  );

  const ConditionalRedirect: FC<{}> = () => {
    switch (isLoggedIn) {
      case true:
        return <Redirect to={props.default} />;
      case false:
        return <Redirect to={props.redirectTo} />;
    }
  };

  return (
    <Route path="/">
      <ConditionalRedirect />
    </Route>
  );
};

export default RootRoute;
