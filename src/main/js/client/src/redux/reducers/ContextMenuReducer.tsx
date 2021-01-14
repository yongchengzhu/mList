import { Book } from '../../models/states';
import { Reducer } from 'redux';
import { BookActions, BOOK_CONTEXT_UPDATE } from '../../models/actions/book';

const initialState: Book = {
  id: -1,
  title: '',
  author: null,
  cover: null,
  lastChapterRead: null,
  rating: -1,
  lastReadDate: null,
  daysToWait: 0,
  comments: null,
  status: null,
};

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