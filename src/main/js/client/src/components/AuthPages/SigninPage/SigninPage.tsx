import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import SigninForm from './SigninForm';
import { useDispatch } from 'react-redux';
import { signinActionCreator } from '../../../redux/actions/auth/signin';


const SigninPage: FC<{}> = () => {
  const dispatch = useDispatch();

  return (
    <main>
      <h1>Signin Page</h1>
      <SigninForm
        onSubmit={(values) => dispatch(signinActionCreator(values))}
      />
      <Link to="/signup">Don't have an account?</Link>
    </main>
  );
};

export default SigninPage;
