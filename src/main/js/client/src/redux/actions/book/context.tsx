import { ActionCreator } from 'redux';
import {
  BookContextUpdateAction,
  BOOK_CONTEXT_UPDATE,
} from '../../../models/actions/book';
import { Book } from '../../../models/states';

export const bookContextUpdateAction: ActionCreator<BookContextUpdateAction> = (
  book: Book
) => ({
  type: BOOK_CONTEXT_UPDATE,
  book,
});
