import { Book, SortConfig, FilterConfig } from '../states';

export const BOOK_CREATE_REQUEST = 'BOOK_CREATE_REQUEST';
export const BOOK_CREATE_SUCCESS = 'BOOK_CREATE_SUCCESS';
export const BOOK_CREATE_FAILURE = 'BOOK_CREATE_FAILURE';

export const BOOK_CREATE_MODAL_OPEN = 'BOOK_CREATE_MODAL_OPEN';
export const BOOK_CREATE_MODAL_CLOSE = 'BOOK_CREATE_MODAL_CLOSE';

export const BOOKS_FETCH_REQUEST = 'BOOK_FETCH_REQUEST';
export const BOOKS_FETCH_SUCCESS = 'BOOK_FETCH_SUCCESS';
export const BOOKS_FETCH_FAILURE = 'BOOK_FETCH_FAILURE';

export const BOOK_DELETE_MODAL_OPEN = 'BOOK_DELETE_MODAL_OPEN';
export const BOOK_DELETE_MODAL_CLOSE = 'BOOK_DELETE_MODAL_CLOSE';

export const BOOK_CONTEXT_UPDATE = 'BOOK_CONTEXT_UPDATE';

export const BOOK_DELETE_REQUEST = 'BOOK_DELETE_REQUEST';
export const BOOK_DELETE_SUCCESS = 'BOOK_DELETE_SUCCESS';
export const BOOK_DELETE_FAILURE = 'BOOK_DELETE_FAILURE';

export const BOOK_EDIT_MODAL_OPEN = 'BOOK_EDIT_MODAL_OPEN';
export const BOOK_EDIT_MODAL_CLOSE = 'BOOK_EDIT_MODAL_CLOSE';

export const BOOK_EDIT_REQUEST = 'BOOK_EDIT_REQUEST';
export const BOOK_EDIT_SUCCESS = 'BOOK_EDIT_SUCCESS';
export const BOOK_EDIT_FAILURE = 'BOOK_EDIT_FAILURE';

export const SORT_CONFIG_SET = 'SORT_CONFIG_SET';
export const FILTER_CONFIG_SET = 'FILTER_CONFIG_SET';

export interface BookCreateRequestAction {
  type: typeof BOOK_CREATE_REQUEST;
}

export interface BookCreateSuccessAction {
  type: typeof BOOK_CREATE_SUCCESS;
  book: Book;
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

export interface BookDeleteModalOpenAction {
  type: typeof BOOK_DELETE_MODAL_OPEN;
}

export interface BookDeleteModalCloseAction {
  type: typeof BOOK_DELETE_MODAL_CLOSE;
}

export interface BookContextUpdateAction {
  type: typeof BOOK_CONTEXT_UPDATE;
  book: Book;
}

export interface BookDeleteRequestAction {
  type: typeof BOOK_DELETE_REQUEST;
}

export interface BookDeleteSuccessAction {
  type: typeof BOOK_DELETE_SUCCESS;
  id: number;
}

export interface BookDeleteFailureAction {
  type: typeof BOOK_DELETE_FAILURE;
  error: string | null;
}

export interface BookEditModalOpenAction {
  type: typeof BOOK_EDIT_MODAL_OPEN;
}

export interface BookEditModalCloseAction {
  type: typeof BOOK_EDIT_MODAL_CLOSE;
}

export interface BookEditRequestAction {
  type: typeof BOOK_EDIT_REQUEST;
}

export interface BookEditSuccessAction {
  type: typeof BOOK_EDIT_SUCCESS;
  book: Book;
}

export interface BookEditFailureAction {
  type: typeof BOOK_EDIT_FAILURE;
  error: string | null;
}

export interface SortConfigSetAction {
  type: typeof SORT_CONFIG_SET;
  sortConfig: SortConfig;
}

export interface FilterConfigSetAction {
  type: typeof FILTER_CONFIG_SET;
  filterConfig: FilterConfig;
}

export type BookActions =
  | BookCreateRequestAction
  | BookCreateSuccessAction
  | BookCreateFailureAction
  | BookCreateModalOpenAction
  | BookCreateModalCloseAction
  | BooksFetchRequestAction
  | BooksFetchSuccessAction
  | BooksFetchFailureAction
  | BookDeleteModalOpenAction
  | BookDeleteModalCloseAction
  | BookContextUpdateAction
  | BookDeleteRequestAction
  | BookDeleteSuccessAction
  | BookDeleteFailureAction
  | BookEditModalOpenAction
  | BookEditModalCloseAction
  | BookEditRequestAction
  | BookEditSuccessAction
  | BookEditFailureAction
  | SortConfigSetAction
  | FilterConfigSetAction;
