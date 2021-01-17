import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import SignupForm from './SignupForm';
import { signupActionCreator } from '../../../redux/actions/auth/signup';
import logo from '../../../assets/logo1.png';
import styles from '../AuthPages.module.scss';

const SignupPage: React.FC<{}> = () => {
  const dispatch = useDispatch();

  return (
    <main className={styles.main}>
      <img src={logo} />
      <SignupForm
        onSubmit={(values) => dispatch(signupActionCreator(values))}
      />
    </main>
  );
};

export default SignupPage;
