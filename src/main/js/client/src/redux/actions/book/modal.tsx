import { ActionCreator } from 'redux';
import {
  BookCreateModalOpenAction,
  BOOK_CREATE_MODAL_OPEN,
  BookCreateModalCloseAction,
  BOOK_CREATE_MODAL_CLOSE,
  BookDeleteModalOpenAction,
  BOOK_DELETE_MODAL_OPEN,
  BookDeleteModalCloseAction,
  BOOK_DELETE_MODAL_CLOSE,
} from '../../../models/actions/book';

export const bookCreateModalOpenAction: ActionCreator<BookCreateModalOpenAction> = () => ({
  type: BOOK_CREATE_MODAL_OPEN,
});

export const bookCreateModalCloseAction: ActionCreator<BookCreateModalCloseAction> = () => ({
  type: BOOK_CREATE_MODAL_CLOSE,
});

export const bookDeleteModalOpenAction: ActionCreator<BookDeleteModalOpenAction> = () => ({
  type: BOOK_DELETE_MODAL_OPEN,
});

export const bookDeleteModalCloseAction: ActionCreator<BookDeleteModalCloseAction> = () => ({
  type: BOOK_DELETE_MODAL_CLOSE,
});