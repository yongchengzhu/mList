import { Book, ContextMenuState, mListStates } from '../../../models/states';
import { TITLE, LAST_READ, RATING, LAST_READ_DATE, getFormattedLastReadDate, DAYS_LEFT, getDaysLeft, STATUS, LANGUAGE, ID, COVER_IMAGE, READ_SINCE, DAYS_TO_WAIT } from '../../../components/BookShelfPage/common';
import { ThunkDispatch } from 'redux-thunk';
import { mListActions } from '../../../models/actions';
import { bookContextUpdateAction } from './context';

export const getCell = (r: number, c: number) => {
  const table: any = document.getElementById('book-table');
  if (table) {
    return table.rows[r].cells[c];
  }
  return null;
}

const fillCellContent = (f: any, formData: any) => {
  f(TITLE).innerHTML = formData.title;
  f(LAST_READ).innerHTML = formData.lastChapterRead;
  f(RATING).innerHTML = formData.rating;
  f(READ_SINCE).innerHTML = getFormattedLastReadDate(formData.lastReadDate);
  f(DAYS_LEFT).innerHTML = getDaysLeft(formData.lastReadDate, formData.daysToWait)
  f(STATUS).innerHTML = formData.status;
  f(LANGUAGE).innerHTML = formData.language;
  f(ID).innerHTML = formData.id;
  f(COVER_IMAGE).innerHTML = formData.cover;
  f(LAST_READ_DATE).innerHTML = formData.lastReadDate;
  f(DAYS_TO_WAIT).innerHTML = formData.daysToWait;
}

export const insertRow = (formData: Book, dispatch: ThunkDispatch<mListStates, null, mListActions>) => {
  const table: any = document.getElementById("book-table");
  
  if (table) {
    const row = table.insertRow(1);
    fillCellContent(g(row), formData);
    row.oncontextmenu = (e: any) => {
      const target = e.target;
      const context: ContextMenuState = {
        ...formData,
        row: target.parentNode.rowIndex,
      }
      dispatch(bookContextUpdateAction(context));
    }
  }
}

const f = (row: any) => {
  const table: any = document.getElementById("book-table");
  return (col: any) => table.rows[row].cells[col];
}

const g = (row: any) => {
  return (col: any) => row.insertCell(col);
}

export const modifyRow = (formData: Book, row: number) => {
  fillCellContent(f(row), formData);
}