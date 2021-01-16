import { ActionCreator } from 'redux';

import {
  BOOK_CREATE_REQUEST,
  BOOK_CREATE_SUCCESS,
  BOOK_CREATE_FAILURE,
  BookCreateRequestAction,
  BookCreateSuccessAction,
  BookCreateFailureAction,
} from '../../../models/actions/book';
import server from '../../../apis/server';
import { tokenConfig, thunkActionCreator } from '../util';
import { Book } from '../../../models/states';

const bookCreateRequestAction: ActionCreator<BookCreateRequestAction> = () => ({
  type: BOOK_CREATE_REQUEST,
});

const bookCreateSuccessAction: ActionCreator<BookCreateSuccessAction> = (book: Book) => ({
  type: BOOK_CREATE_SUCCESS,
  book: book,
});

const bookCreateFailureAction: ActionCreator<BookCreateFailureAction> = (
  error: string
) => ({
  type: BOOK_CREATE_FAILURE,
  error,
});

export const bookCreateActionCreator = thunkActionCreator(
  ({ dispatch }, formData: Book) => {
    dispatch(bookCreateRequestAction());
    return server
      .post('/book', formData, tokenConfig())
      .then(({ data }) => {
        return dispatch(bookCreateSuccessAction(data));
      })
      .catch((error) =>
        dispatch(
          bookCreateFailureAction(
            error.response.data.message ||
              JSON.stringify(error.response.data) ||
              'Book creation failed. Please try again later.'
          )
        )
      );
  }
);