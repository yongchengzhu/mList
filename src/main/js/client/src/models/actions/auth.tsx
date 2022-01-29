export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_COMPLETE = 'SIGNUP_COMPLETE';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const SIGNIN_REQUEST = 'SIGNIN_REQUEST';
export const SIGNIN_COMPLETE = 'SIGNIN_COMPLETE';
export const SIGNIN_FAILURE = 'SIGNIN_FAILURE';

export const SIGNOUT = 'SIGNOUT';

export const CHECK_TOKEN_REQUEST = 'CHECK_TOKEN_REQUEST';
export const CHECK_TOKEN_SUCCESS = 'CHECK_TOKEN_SUCCESS';
export const CHECK_TOKEN_FAILURE = 'CHECK_TOKEN_FAILURE';

export interface SignupRequestAction {
  type: typeof SIGNUP_REQUEST;
}

export interface SignupCompleteAction {
  type: typeof SIGNUP_COMPLETE;
}

export interface SignupFailureAction {
  type: typeof SIGNUP_FAILURE;
  error: string | null;
}

export interface SigninRequestAction {
  type: typeof SIGNIN_REQUEST;
}

export interface SigninCompleteAction {
  type: typeof SIGNIN_COMPLETE;
  username: string;
}

export interface SigninFailureAction {
  type: typeof SIGNIN_FAILURE;
  error: string | null;
}

export interface SignoutAction {
  type: typeof SIGNOUT;
}

export interface CheckTokenRequestAction {
  type: typeof CHECK_TOKEN_REQUEST;
  token: string;
}

export interface CheckTokenSuccessAction {
  type: typeof CHECK_TOKEN_SUCCESS;
  username: string;
}

export interface CheckTokenFailureAction {
  type: typeof CHECK_TOKEN_FAILURE;
}

export type AuthActions =
  | SignupRequestAction
  | SignupCompleteAction
  | SignupFailureAction
  | SigninRequestAction
  | SigninCompleteAction
  | SigninFailureAction
  | SignoutAction
  | CheckTokenRequestAction
  | CheckTokenSuccessAction
  | CheckTokenFailureAction;
