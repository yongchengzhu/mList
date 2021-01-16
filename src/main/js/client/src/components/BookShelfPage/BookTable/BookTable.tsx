import React, { FC } from 'react';
import { ContextMenuTrigger } from "react-contextmenu";
import moment from 'moment';

import './BookTable.module.scss';
import styles from './BookTable.module.scss';
import LoadingSpinner from '../../Loaders/LoadingSpinner';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../models/states';
import { bookContextUpdateAction } from '../../../redux/actions/book/context';
import { setSortConfigAction } from '../../../redux/actions/book/sort';
import { useQuery, historyPush } from '../common';

const BookTable: FC<{}> = () => {
  let query = useQuery();
  const dispatch = useDispatch();
  const { 
    fetchingAll, 
    books, 
    sortConfig 
  } = useSelector((state: RootState) => state.book);

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

  const getClassName = (name: string) => {
    if (!sortConfig.order) {
      return styles.hidden;
    }
    return sortConfig.key === name ? styles[sortConfig.order] : styles.hidden;
  };

  const handleSort = (key: string) => {
    let order = 'desc';
    if (
      sortConfig.key === key &&
      sortConfig.order === 'desc'
    ) {
      order = 'asc';
    }
    query.set('sortKey', key);
    query.set('sortOrder', order);
    historyPush(query);
    dispatch(setSortConfigAction({ key, order }));
  }

  return (
    <div>
      <table id="book-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('title')}>
              <span className={getClassName('title')}>Title</span>
            </th>
            <th onClick={() => handleSort('last_read')}>
              <span className={getClassName('last_read')}>Last Read</span>
            </th>
            <th onClick={() => handleSort('rating')}>
              <span className={getClassName('rating')}>Rating</span>
            </th>
            <th onClick={() => handleSort('read_since')}>
              <span className={getClassName('read_since')}>Read Since</span>
            </th>
            <th onClick={() => handleSort('days_left')}>
              <span className={getClassName('days_left')}>Days Left</span>
            </th>
          </tr>
        </thead>
        <tbody>{renderTableBody()}</tbody>
      </table>
    </div>
  );
};

export default BookTable;
