import { BookState } from '../../models/states';
import { Reducer } from 'redux';
import {
  BookActions,
  BOOK_CREATE_REQUEST,
  BOOK_CREATE_SUCCESS,
  BOOK_CREATE_FAILURE,
  BOOK_CREATE_MODAL_OPEN,
  BOOK_CREATE_MODAL_CLOSE,
  BOOKS_FETCH_REQUEST,
  BOOKS_FETCH_SUCCESS,
  BOOKS_FETCH_FAILURE,
  BOOK_DELETE_MODAL_OPEN,
  BOOK_DELETE_MODAL_CLOSE,
  BOOK_DELETE_SUCCESS,
  BOOK_DELETE_REQUEST,
  BOOK_DELETE_FAILURE,
} from '../../models/actions/book';

const initialState: BookState = {
  books: [],
  showCreateModal: false,
  showDeleteModal: false,
  creating: false,
  createError: null,
  fetchingAll: false,
  fetchAllError: null,
  deleting: false,
  deleteError: null,
};

const bookReducer: Reducer<BookState, BookActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case BOOK_CREATE_MODAL_OPEN:
      return { ...state, showCreateModal: true };
    case BOOK_CREATE_MODAL_CLOSE:
      return { ...state, showCreateModal: false, createError: null };
    case BOOK_DELETE_MODAL_OPEN:
      return { ...state, showDeleteModal: true };
    case BOOK_DELETE_MODAL_CLOSE:
      return { ...state, showDeleteModal: false, deleteError: null };
    case BOOK_CREATE_REQUEST:
      return { ...state, creating: true, createError: null };
    case BOOK_CREATE_SUCCESS:
      return { ...state, creating: false };
    case BOOK_CREATE_FAILURE:
      return { ...state, creating: false, createError: action.error };
    case BOOKS_FETCH_REQUEST:
      return { ...state, fetchingAll: true, fetchAllError: null };
    case BOOKS_FETCH_SUCCESS:
      return {
        ...state,
        fetchingAll: false,
        fetchAllError: null,
        books: action.books,
      };
    case BOOKS_FETCH_FAILURE:
      return { ...state, fetchingAll: false };
    case BOOK_DELETE_REQUEST:
      return { ...state, deleting: true };
    case BOOK_DELETE_SUCCESS:
      return { ...state, deleting: false, showDeleteModal: false };
    case BOOK_DELETE_FAILURE:
      return { ...state, deleting: false, deleteError: action.error }; 
    default:
      return state;
  }
};

export default bookReducer;
