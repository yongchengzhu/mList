import React from 'react';
import { useDispatch } from 'react-redux';

import SignupForm from './SignupForm';
import { signupActionCreator } from '../../../redux/actions/auth/signup';
import logo from '../../../assets/logo1.png';
import styles from '../AuthPages.module.scss';

const SignupPage: React.FC<{}> = () => {
  const dispatch = useDispatch();

  return (
    <main className={styles.main}>
      <img className={styles.logo} alt="Logo" src={logo} />
      <SignupForm
        onSubmit={(values) => dispatch(signupActionCreator(values))}
      />
    </main>
  );
};

export default SignupPage;
