import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';

import TokenConfirmPage from './AuthPages/TokenConfirmPage/TokenConfirmPage';
import BookShelfPage from './BookShelfPage/BookShelfPage';
import RootRoute from './HOCs/RootRoute';
import SigninPage from './AuthPages/SigninPage/SigninPage';
import ConfirmRequestPage from './AuthPages/ConfirmRequestPage/ConfirmRequestPage';
import history from '../history';
import Navbar from './Navbar/Navbar';
import useApp from './useApp';

import '../App.css';
import SignupPage from './AuthPages/SignupPage/SignupPage';

const App: React.FC<{}> = () => {
  const [
    renderLoadingCurtain, 
    renderCreateBookModal, 
    renderDeleteBookModal, 
    renderEditBookModal
  ] = useApp();

  return (
    <Router history={history}>
      <Navbar />
      {renderLoadingCurtain()}
      {renderCreateBookModal()}
      {renderDeleteBookModal()}
      {renderEditBookModal()}
      <Switch>
        <Route path="/signin" component={SigninPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/confirm-request" component={ConfirmRequestPage} />
        <Route path="/email-confirmation" component={TokenConfirmPage} />
        <Route path="/bookshelf" component={BookShelfPage} />
        <RootRoute path="/" default="/bookshelf" redirectTo="/signin" />
      </Switch>
    </Router>
  );
};

export default App;
