import React, { FC } from 'react';
import { ContextMenuTrigger } from "react-contextmenu";
import moment from 'moment';

import './BookTable.module.scss';
import styles from './BookTable.module.scss';
import LoadingSpinner from '../../Loaders/LoadingSpinner';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, SortConfigKey, SortConfigOrder, Source } from '../../../models/states';
import { bookContextUpdateAction } from '../../../redux/actions/book/context';
import { setSortConfigAction } from '../../../redux/actions/book/sort';
import { useQuery, historyPush } from '../common';

const BookTable: FC<{}> = () => {
  let query = useQuery();
  const dispatch = useDispatch();
  const { 
    fetchingAll, 
    books, 
    sortConfig,
    filterConfig,
  } = useSelector((state: RootState) => state.book);

  const renderTableBody = () => {
    if (fetchingAll) return <LoadingSpinner />;
    return sortedBooks.map((book) => {
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

  const handleSort = (key: SortConfigKey) => {
    let order: SortConfigOrder = 'desc';
    if (
      sortConfig.key === key &&
      sortConfig.order === 'desc'
    ) {
      order = 'asc';
    }
    historyPush(query);
    dispatch(setSortConfigAction({ key, order }));
  }

  const sortedBooks = React.useMemo(() => {
    let result = [...books];
    if (sortConfig !== null) {
      result.sort((a, b) => {
        if (sortConfig.key) {
          const first = a[sortConfig.key];
          const second = b[sortConfig.key];
          if (first && second) {
            if (first < second) {
              return sortConfig.order === 'asc' ? -1 : 1;
            }
            if (first > second) {
              return sortConfig.order === 'asc' ? 1 : -1;
            }
          }
        }
        return 0;
      });


      result = result.filter(book => {
        return (!filterConfig.source.size || filterConfig.source.has(book.language))
         && ((filterConfig.status === 'all' || filterConfig.status === book.status));
      });
    }
    return result;
  }, [books, sortConfig, filterConfig]);

  return (
    <div>
      <table id="book-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('title')}>
              <span className={getClassName('title')}>Title</span>
            </th>
            <th onClick={() => handleSort('lastChapterRead')}>
              <span className={getClassName('lastChapterRead')}>Last Read</span>
            </th>
            <th onClick={() => handleSort('rating')}>
              <span className={getClassName('rating')}>Rating</span>
            </th>
            <th onClick={() => handleSort('lastReadDate')}>
              <span className={getClassName('lastReadDate')}>Read Since</span>
            </th>
            <th onClick={() => handleSort('daysToWait')}>
              <span className={getClassName('daysToWait')}>Days Left</span>
            </th>
          </tr>
        </thead>
        <tbody>{renderTableBody()}</tbody>
      </table>
    </div>
  );
};

export default BookTable;
