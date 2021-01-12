import {
  BookDeleteRequestAction,
  BookDeleteSuccessAction,
  BookDeleteFailureAction,
  BOOK_DELETE_REQUEST,
  BOOK_DELETE_SUCCESS,
  BOOK_DELETE_FAILURE,
} from '../../../models/actions/book';
import { ActionCreator } from 'redux';
import { thunkActionCreator, tokenConfig } from '../util';
import server from '../../../apis/server';
import { booksFetchActionCreator } from './fetchAll';

const bookDeleteRequestAction: ActionCreator<BookDeleteRequestAction> = () => ({
  type: BOOK_DELETE_REQUEST,
});

const bookDeleteSuccessAction: ActionCreator<BookDeleteSuccessAction> = () => ({
  type: BOOK_DELETE_SUCCESS,
});

const bookDeleteFailureAction: ActionCreator<BookDeleteFailureAction> = (
  error: string
) => ({
  type: BOOK_DELETE_FAILURE,
  error,
});

export const bookDeleteActionCreator = thunkActionCreator(
  ({ dispatch }, id: number) => {
    dispatch(bookDeleteRequestAction());
    return server
      .delete(`/book/${id}`, tokenConfig())
      .then(() => {
        dispatch(booksFetchActionCreator());
        return dispatch(bookDeleteSuccessAction());
      })
      .catch((error) =>
        dispatch(
          bookDeleteFailureAction(
            error.response.data.message ||
              JSON.stringify(error.response.data) ||
              'Book deletion failed. Please try again later.'
          )
        )
      );
  }
);
