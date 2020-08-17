import { Reducer } from 'redux';

import { AuthState } from '../../models/states';
import {
  SIGNUP_REQUEST,
  SIGNUP_COMPLETE,
  SIGNUP_FAILURE,
  AuthActions,
  SIGNIN_COMPLETE,
  SIGNIN_REQUEST,
  SIGNIN_FAILURE,
  SIGNOUT,
  CHECK_TOKEN_REQUEST,
  CHECK_TOKEN_SUCCESS,
  CHECK_TOKEN_FAILURE,
} from '../../models/actions/auth';

const initialState: AuthState = {
  loading: false,
  checking: false,
  isLoggedIn: false,
  error: null,
  username: null,
};

const authReducer: Reducer<AuthState, AuthActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return { ...state, loading: true, error: null };
    case SIGNUP_COMPLETE:
      return { ...state, loading: false, error: null };
    case SIGNUP_FAILURE:
      return { ...state, loading: false, error: action.error };
    case SIGNIN_REQUEST:
      return { ...state, loading: true, error: null };
    case SIGNIN_COMPLETE:
      return {
        ...state,
        loading: false,
        error: null,
        username: action.username,
        isLoggedIn: true,
      };
    case SIGNIN_FAILURE:
      return { ...state, loading: false, error: action.error };
    case SIGNOUT:
      return { ...state, username: null, isLoggedIn: false };
    case CHECK_TOKEN_REQUEST:
      return { ...state, checking: true };
    case CHECK_TOKEN_SUCCESS:
      return {
        ...state,
        checking: false,
        error: null,
        username: action.username,
        isLoggedIn: true,
      };
    case CHECK_TOKEN_FAILURE:
      return {
        ...state,
        checking: false,
      };
    default:
      return state;
  }
};

export default authReducer;
