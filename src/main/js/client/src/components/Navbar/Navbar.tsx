import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { AuthState, RootState } from '../../models/states';
import history from '../../history';
import { bookCreateModalOpenAction } from '../../redux/actions/book/modal';
import { signoutAction } from '../../redux/actions/auth/signout';

import styles from './Navbar.module.scss';

const Navbar: FC<{}> = () => {
  const auth: AuthState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const AuthenticatedNavbar: FC<{}> = () => {
    return (
      <div className={styles.container}>
        <span>{auth.username}</span>
        <button
          onClick={() => {
            history.push('/signin');
            localStorage.removeItem('mList-token');
            dispatch(signoutAction());
          }}
        >
          Logout
        </button>
        <button onClick={() => dispatch(bookCreateModalOpenAction())}>
          Add Book
        </button>
      </div>
    );
  };

  return (
    <nav className={styles.navbar}>
      {auth.isLoggedIn ? <AuthenticatedNavbar /> : null}
    </nav>
  );
};

export default Navbar;
