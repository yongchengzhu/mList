// @ts-nocheck
import { ActionCreator } from 'redux';
import {
  SigninRequestAction,
  SIGNIN_REQUEST,
  SigninCompleteAction,
  SIGNIN_COMPLETE,
  SigninFailureAction,
  SIGNIN_FAILURE,
} from '../../../models/actions/auth';
import { SigninFormData } from '../../../models/forms/auth';
import server from '../../../apis/server';
import JwtDecode from 'jwt-decode';
import { thunkActionCreator } from '../util';

const signinRequestAction: ActionCreator<SigninRequestAction> = () => ({
  type: SIGNIN_REQUEST,
});

const signinCompleteAction: ActionCreator<SigninCompleteAction> = (
  sub: string, redirect: () => void
) => ({
  type: SIGNIN_COMPLETE,
  username: sub,
});

const signinFailureAction: ActionCreator<SigninFailureAction> = (
  error: string
) => ({
  type: SIGNIN_FAILURE,
  error: error,
});

export const signinActionCreator = thunkActionCreator(
  ({ dispatch }, formData: SigninFormData) => {
    dispatch(signinRequestAction());
    return server
      .post('/user/signin', formData)
      .then((response) => {
        const { token } = response.data;
        const { sub } = JwtDecode(token) as any;
        localStorage.setItem('mList-token', token);
        // history.push('/bookshelf');
        return dispatch(signinCompleteAction(sub));
      })
      .catch((error) => {
        const serverError = error.response.data
          ? 'Whoops, looks like something went wrong!'
          : undefined;
        return dispatch(
          signinFailureAction(
            error.response.data.message ||
              serverError ||
              'Signin failed. Please try again later.'
          )
        )
      });
  }
);
