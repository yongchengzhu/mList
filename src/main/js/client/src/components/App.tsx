import { FC } from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import TokenConfirmPage from './AuthPages/TokenConfirmPage/TokenConfirmPage';
import BookShelfPage from './BookShelfPage/BookShelfPage';
import RootRoute from './HOCs/RootRoute';
import SigninPage from './AuthPages/SigninPage/SigninPage';
import ConfirmRequestPage from './AuthPages/ConfirmRequestPage/ConfirmRequestPage';
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
    <BrowserRouter>
      {renderLoadingCurtain()}
      {renderCreateBookModal()}
      {renderDeleteBookModal()}
      {renderEditBookModal()}
      <Routes>
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/confirm-request" element={<ConfirmRequestPage />} />
        <Route path="/email-confirmation" element={<TokenConfirmPage />} />
        <Route path="/bookshelf" element={<PrivateRoute />}>
          <Route path='/bookshelf' element={<BookShelfPage />}/>
        </Route>
        <Route path="/" element={<RootRoute />}>
          <Route path="/bookshelf" element={<BookShelfPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
