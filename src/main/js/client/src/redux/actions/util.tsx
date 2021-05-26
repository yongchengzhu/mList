import { AxiosRequestConfig } from 'axios';
import { ActionCreator } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { mListActions } from '../../models/actions';
import { mListStates } from '../../models/states';

export const tokenConfig: () => AxiosRequestConfig = () => {
  const token = localStorage.getItem('mList-token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

interface CallbackParams<S, A extends mListActions> {
  dispatch: ThunkDispatch<S, null, A>;
  getState: () => S;
}

export type ThunkActionCreator<A extends mListActions, S> = (
  cb: (params: CallbackParams<S, A>, ...args: any[]) => Promise<A>
) => ActionCreator<ThunkAction<Promise<A>, S, null, A>>;

export const thunkActionCreator: ThunkActionCreator<mListActions, mListStates> =

    (cb) =>
    (...args: any[]) =>
    (dispatch, getState) =>
      cb({ dispatch, getState }, ...args);
