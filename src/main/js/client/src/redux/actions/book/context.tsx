import { BookContextUpdateAction, BOOK_CONTEXT_UPDATE } from '../../../models/actions/book';
import { ActionCreator } from 'redux';
import { ContextMenuState } from '../../../models/states';

export const bookContextUpdateAction: ActionCreator<BookContextUpdateAction> = (book: ContextMenuState) => ({
  type: BOOK_CONTEXT_UPDATE,
  book: book,
});