import { ActionCreator } from 'redux';

import {
  BookEditRequestAction,
  BOOK_EDIT_REQUEST,
  BookEditSuccessAction,
  BOOK_EDIT_SUCCESS,
  BookEditFailureAction,
  BOOK_EDIT_FAILURE,
} from '../../../models/actions/book';
import { thunkActionCreator, tokenConfig } from '../util';
import server from '../../../apis/server';
import { Book } from '../../../models/states';

const bookEditRequestAction: ActionCreator<BookEditRequestAction> = () => ({
  type: BOOK_EDIT_REQUEST,
});

const bookEditSuccessAction: ActionCreator<BookEditSuccessAction> = (
  book: Book
) => ({
  type: BOOK_EDIT_SUCCESS,
  book,
});

const bookEditFailureAction: ActionCreator<BookEditFailureAction> = (
  error: string
) => ({
  type: BOOK_EDIT_FAILURE,
  error,
});

export const bookEditActionCreator = thunkActionCreator(
  ({ dispatch }, formData: Book) => {
    dispatch(bookEditRequestAction());
    return server
      .put(`/book/${formData.id}`, formData, tokenConfig())
      .then(({ data }) => dispatch(bookEditSuccessAction(data)))
      .catch((error) =>
        dispatch(
          bookEditFailureAction(
            error.response.data.message ||
              JSON.stringify(error.response.data) ||
              'Book creation failed. Please try again later.'
          )
        )
      );
  }
);
