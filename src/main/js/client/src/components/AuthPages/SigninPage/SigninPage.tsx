import React, { FC } from 'react';
import SigninForm from './SigninForm';
import { useDispatch } from 'react-redux';

import { signinActionCreator } from '../../../redux/actions/auth/signin';
import logo from '../../../assets/logo1.png';
import styles from '../AuthPages.module.scss';

const SigninPage: FC<{}> = () => {
  const dispatch = useDispatch();

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
