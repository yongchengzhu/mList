import { Book } from '../states/';

export const BOOK_CREATE_REQUEST = 'BOOK_CREATE_REQUEST';
export const BOOK_CREATE_SUCCESS = 'BOOK_CREATE_SUCCESS';
export const BOOK_CREATE_FAILURE = 'BOOK_CREATE_FAILURE';

export const BOOK_CREATE_MODAL_OPEN = 'BOOK_CREATE_MODAL_OPEN';
export const BOOK_CREATE_MODAL_CLOSE = 'BOOK_CREATE_MODAL_CLOSE';

export const BOOKS_FETCH_REQUEST = 'BOOK_FETCH_REQUEST';
export const BOOKS_FETCH_SUCCESS = 'BOOK_FETCH_SUCCESS';
export const BOOKS_FETCH_FAILURE = 'BOOK_FETCH_FAILURE';


export interface BookCreateRequestAction {
  type: typeof BOOK_CREATE_REQUEST;
}

export interface BookCreateSuccessAction {
  type: typeof BOOK_CREATE_SUCCESS;
}

export interface BookCreateFailureAction {
  type: typeof BOOK_CREATE_FAILURE;
  error: string | null;
}

export interface BookCreateModalOpenAction {
  type: typeof BOOK_CREATE_MODAL_OPEN;
}

export interface BookCreateModalCloseAction {
  type: typeof BOOK_CREATE_MODAL_CLOSE;
}

export interface BooksFetchRequestAction {
  type: typeof BOOKS_FETCH_REQUEST;
}

export interface BooksFetchSuccessAction {
  type: typeof BOOKS_FETCH_SUCCESS;
  books: Book[];
}

export interface BooksFetchFailureAction {
  type: typeof BOOKS_FETCH_FAILURE;
}

export type BookActions =
  | BookCreateRequestAction
  | BookCreateSuccessAction
  | BookCreateFailureAction
  | BookCreateModalOpenAction
  | BookCreateModalCloseAction
  | BooksFetchRequestAction
  | BooksFetchSuccessAction
  | BooksFetchFailureAction;
