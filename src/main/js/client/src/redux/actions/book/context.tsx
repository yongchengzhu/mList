import { BookContextUpdateAction, BOOK_CONTEXT_UPDATE } from '../../../models/actions/book';
import { ActionCreator } from 'redux';
import { Book } from '../../../models/states';

export const bookContextUpdateAction: ActionCreator<BookContextUpdateAction> = (book: Book) => ({
  type: BOOK_CONTEXT_UPDATE,
  book: book,
});