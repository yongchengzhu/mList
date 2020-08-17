import { ActionCreator } from 'redux';
import {
  BookCreateModalOpenAction,
  BOOK_CREATE_MODAL_OPEN,
  BookCreateModalCloseAction,
  BOOK_CREATE_MODAL_CLOSE,
} from '../../../models/actions/book';

export const bookCreateModalOpenAction: ActionCreator<BookCreateModalOpenAction> = () => ({
  type: BOOK_CREATE_MODAL_OPEN,
});

export const bookCreateModalCloseAction: ActionCreator<BookCreateModalCloseAction> = () => ({
  type: BOOK_CREATE_MODAL_CLOSE,
});
