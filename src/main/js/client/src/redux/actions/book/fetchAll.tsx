import { ActionCreator } from 'redux';
import {
  BOOKS_FETCH_REQUEST,
  BOOKS_FETCH_SUCCESS,
  BOOKS_FETCH_FAILURE,
  BooksFetchRequestAction,
  BooksFetchSuccessAction,
  BooksFetchFailureAction,
} from '../../../models/actions/book';
import { thunkActionCreator, tokenConfig } from '../util';
import server from '../../../apis/server';

const booksFetchRequestAction: ActionCreator<BooksFetchRequestAction> = () => ({
  type: BOOKS_FETCH_REQUEST,
});

const booksFetchSuccessAction: ActionCreator<BooksFetchSuccessAction> = (
  data
) => ({
  type: BOOKS_FETCH_SUCCESS,
  books: data,
});

const booksFetchFailureAction: ActionCreator<BooksFetchFailureAction> = () => ({
  type: BOOKS_FETCH_FAILURE,
});

export const booksFetchActionCreator = thunkActionCreator(({ dispatch }) => {
  dispatch(booksFetchRequestAction());

  return server
    .get('/book', tokenConfig())
    .then((response) => dispatch(booksFetchSuccessAction(response.data)))
    .catch(() => dispatch(booksFetchFailureAction()));
});
