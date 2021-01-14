import React, { FC } from 'react';
import { ContextMenuTrigger } from "react-contextmenu";
import moment from 'moment';

import './BookTable.module.scss';
import LoadingSpinner from '../../Loaders/LoadingSpinner';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../models/states';
import { bookContextUpdateAction } from '../../../redux/actions/book/context';

const BookTable: FC<{}> = () => {
  const dispatch = useDispatch();
  const { fetchingAll, books } = useSelector((state: RootState) => state.book);
  console.log('books', books);
  const renderTableBody = () => {
    if (fetchingAll) return <LoadingSpinner />;
    return books.map((book) => {
      const lastReadDate = moment(book.lastReadDate).utc().format("MM/DD/YYYY");
      const daysLeft     = moment(book.lastReadDate).utc()
        .add(book.daysToWait, 'days').utc()
        .diff(moment(book.lastReadDate).utc(), 'days');
      return (
        <ContextMenuTrigger 
          id="book-contextmenu" 
          renderTag="tr" 
          key={book.id} 
          attributes={{ onContextMenu: () => dispatch(bookContextUpdateAction(book))}}
        >
          <td>{book.title}</td>
          <td>{book.lastChapterRead}</td>
          <td>{book.rating}</td>
          <td>{lastReadDate}</td>
          <td>{daysLeft}</td>
        </ContextMenuTrigger>
      );
    });
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Last Read</th>
            <th>Rating</th>
            <th>Read Since</th>
            <th>Days Left</th>
          </tr>
        </thead>
        <tbody>{renderTableBody()}</tbody>
      </table>
    </div>
  );
};

export default BookTable;
