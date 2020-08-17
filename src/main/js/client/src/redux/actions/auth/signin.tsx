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
import history from '../../../history';
import { thunkActionCreator } from '../util';

const signinRequestAction: ActionCreator<SigninRequestAction> = () => ({
  type: SIGNIN_REQUEST,
});

const signinCompleteAction: ActionCreator<SigninCompleteAction> = (
  sub: string
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
        const { sub } = JwtDecode(token);
        localStorage.setItem('mList-token', token);
        history.push('/bookshelf');
        return dispatch(signinCompleteAction(sub));
      })
      .catch((error) =>
        dispatch(
          signinFailureAction(
            error.response.data.message ||
              JSON.stringify(error.response.data) ||
              'Signin failed. Please try again later.'
          )
        )
      );
  }
);
