import { FC } from 'react';
import { Switch, Route, Router } from 'react-router-dom';

import TokenConfirmPage from './AuthPages/TokenConfirmPage/TokenConfirmPage';
import BookShelfPage from './BookShelfPage/BookShelfPage';
import RootRoute from './HOCs/RootRoute';
import SigninPage from './AuthPages/SigninPage/SigninPage';
import ConfirmRequestPage from './AuthPages/ConfirmRequestPage/ConfirmRequestPage';
import history from '../history';
import useApp from './useApp';

import '../App.css';
import SignupPage from './AuthPages/SignupPage/SignupPage';
import PrivateRoute from './HOCs/PrivateRoute';

const App: FC<{}> = () => {
  const [
    renderLoadingCurtain,
    renderCreateBookModal,
    renderDeleteBookModal,
    renderEditBookModal,
  ] = useApp();

  return (
    <Router history={history}>
      {renderLoadingCurtain()}
      {renderCreateBookModal()}
      {renderDeleteBookModal()}
      {renderEditBookModal()}
      <Switch>
        <Route path="/signin" component={SigninPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/confirm-request" component={ConfirmRequestPage} />
        <Route path="/email-confirmation" component={TokenConfirmPage} />
        <PrivateRoute path="/bookshelf">
          <BookShelfPage />
        </PrivateRoute>
        <RootRoute path="/" defaultTo="/bookshelf" redirectTo="/signin" />
      </Switch>
    </Router>
  );
};

export default App;
