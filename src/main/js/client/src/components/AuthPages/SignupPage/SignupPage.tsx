import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import SignupForm from './SignupForm';
import { signupActionCreator } from '../../../redux/actions/auth/signup';

const SignupPage: React.FC<{}> = () => {
  const dispatch = useDispatch();

  return (
    <main>
      <h1>Signup</h1>
      <SignupForm
        onSubmit={(values) => dispatch(signupActionCreator(values))}
      />
      <Link to="signin">Already have an account?</Link>
    </main>
  );
};

export default SignupPage;
