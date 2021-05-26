import { FC } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AuthState, RootState } from '../../models/states';

const PrivateRoute: FC<any> = ({ children, ...rest }) => {
  const auth: AuthState = useSelector((state: RootState) => state.auth);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
