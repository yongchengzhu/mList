import { ActionCreator } from 'redux';
import {
  SignupRequestAction,
  SIGNUP_REQUEST,
  SignupCompleteAction,
  SignupFailureAction,
  SIGNUP_COMPLETE,
  SIGNUP_FAILURE,
} from '../../../models/actions/auth';
import { thunkActionCreator } from '../util';
import { SignupFormData } from '../../../models/forms/auth';
import server from '../../../apis/server';
import history from '../../../history';

const signupRequestAction: ActionCreator<SignupRequestAction> = () => ({
  type: SIGNUP_REQUEST,
});

const signupCompleteAction: ActionCreator<SignupCompleteAction> = () => ({
  type: SIGNUP_COMPLETE,
});

const signupFailureAction: ActionCreator<SignupFailureAction> = (
  error: string
) => ({
  type: SIGNUP_FAILURE,
  error,
});

export const signupActionCreator = thunkActionCreator(
  ({ dispatch }, formData: SignupFormData) => {
    dispatch(signupRequestAction());

    return server
      .post('/user/signup', formData)
      .then(() => {
        history.push('/confirm-request', { email: formData.email });
        return dispatch(signupCompleteAction());
      })
      .catch((error) =>
        dispatch(
          signupFailureAction(
            error.response.data.message ||
              JSON.stringify(error.response.data) ||
              'Signup failed. Please try again later.'
          )
        )
      );
  }
);
