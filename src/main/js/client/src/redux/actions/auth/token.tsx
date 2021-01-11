import { ActionCreator } from 'redux';
import {
  CheckTokenRequestAction,
  CHECK_TOKEN_REQUEST,
  CheckTokenSuccessAction,
  CHECK_TOKEN_SUCCESS,
  CheckTokenFailureAction,
  CHECK_TOKEN_FAILURE,
} from '../../../models/actions/auth';
import server from '../../../apis/server';
import { tokenConfig, thunkActionCreator } from '../util';
import JwtDecode from 'jwt-decode';
import history from '../../../history';

export const checkTokenRequestAction: ActionCreator<CheckTokenRequestAction> = (
  token: string
) => ({
  type: CHECK_TOKEN_REQUEST,
  token: token,
});

export const checkTokenSuccessAction: ActionCreator<CheckTokenSuccessAction> = (
  sub: string
) => ({
  type: CHECK_TOKEN_SUCCESS,
  username: sub,
});

export const checkTokenFailureAction: ActionCreator<CheckTokenFailureAction> = () => ({
  type: CHECK_TOKEN_FAILURE,
});

export const checkTokenActionCreator = thunkActionCreator(({ dispatch }) => {
  dispatch(checkTokenRequestAction());

  const token = localStorage.getItem('mList-token');

  if (!token) {
    return new Promise((resolve) =>
      resolve(dispatch(checkTokenFailureAction()))
    );
  }

  return server
    .get('/auth/check', tokenConfig())
    .then(() => {
      const { sub } = JwtDecode(token);
      history.push('/bookshelf');
      return dispatch(checkTokenSuccessAction(sub));
    })
    .catch(() => {
      history.push('/signin');
      localStorage.removeItem('mList-token');
      return dispatch(checkTokenFailureAction());
    });
});
