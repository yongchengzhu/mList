import React, { FC, useEffect } from 'react';
import SigninForm from './SigninForm';
import { useDispatch, useSelector } from 'react-redux';

import { signinActionCreator } from '../../../redux/actions/auth/signin';
import logo from '../../../assets/logo1.png';
import styles from '../AuthPages.module.scss';
import { useHistory, useLocation } from 'react-router-dom';
import { RootState } from '../../../models/states';

const SigninPage: FC<{}> = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location: any = useLocation();
  const auth = useSelector((state: RootState) => state.auth.isLoggedIn);
  const { from } = location.state || { from: { pathname: "/bookshelf" } };
  
  useEffect(() => {
    if (auth) {
      history.replace(from);
    }
  }, [auth]);

  return (
    <main className={styles.main}>
      <img className={styles.logo} src={logo} />
      <SigninForm
        onSubmit={(values) => dispatch(signinActionCreator(values))}
      />
    </main>
  );
};

export default SigninPage;
