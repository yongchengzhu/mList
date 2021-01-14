import { Book } from '../../models/states';
import { Reducer } from 'redux';
import { BookActions, BOOK_CONTEXT_UPDATE } from '../../models/actions/book';
import { initialBookState } from './common';

const initialState: Book = initialBookState;

const contextMenuReducer: Reducer<Book, BookActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case BOOK_CONTEXT_UPDATE:
      return { ...state, ...action.book };
    default:
      return state;
  }
};

export default contextMenuReducer;