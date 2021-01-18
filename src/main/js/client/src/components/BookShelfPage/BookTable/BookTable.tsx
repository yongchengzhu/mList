import React, { FC, useEffect } from 'react';
import { ContextMenuTrigger } from "react-contextmenu";
import moment from 'moment';
import ReactTooltip from "react-tooltip";
import AddIcon from '@material-ui/icons/Add';

import './BookTable.module.scss';
import styles from './BookTable.module.scss';
import LoadingSpinner from '../../Loaders/LoadingSpinner';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, SortConfigKey, SortConfigOrder, Source, SortConfig, FilterConfig, SortFilterConfig, FilterConfigStatus, Book } from '../../../models/states';
import { bookContextUpdateAction } from '../../../redux/actions/book/context';
import { setSortConfigAction } from '../../../redux/actions/book/sort';
import { useQuery, historyPush } from '../common';
import { initalSortFilterConfigState } from '../../../redux/reducers/common';
import { Button, makeStyles } from '@material-ui/core';
import { bookCreateModalOpenAction } from '../../../redux/actions/book/modal';

interface CustomAttributes extends React.HTMLAttributes<HTMLElement> {
  datatip: string;
  datafor: string;
}

const useStyles = makeStyles({
  button: {
    '&:hover': {
      'color': 'white',
      'background-color': '#f73378',
    },
    'margin': '15px 0',
    'border-radius': 0,
    'background-color': '#fff',
    'height': '45px',
    'box-shadow': '0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14), 0px 9px 46px 8px rgba(0,0,0,0.12)',
    '& span': {
      'display': 'flex',
      'justify-content': 'space-between',
    },
  },
});

const BookTable: FC<{}> = () => {
  let query = useQuery();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { 
    fetchingAll, 
    books,
    sortFilterConfig
  } = useSelector((state: RootState) => state.book);

  useEffect(() => {
    const queryConfig: SortFilterConfig = initalSortFilterConfigState;

    query.forEach((value, key) => {
      switch(key) {
        case 'sortKey':
          queryConfig.key = value as SortConfigKey;
          return;
        case 'sortOrder':
          queryConfig.order = value as SortConfigOrder;
          return;
        case 'language':
          queryConfig.source.add(value as Source);
          return;
        case 'status':
          queryConfig.status = value as FilterConfigStatus;
          return;
      }
    });

    dispatch(setSortConfigAction(queryConfig));
  }, []);

  const calculateDaysLeft = (book: Book) => {
    return moment(book.lastReadDate)
            .add(book.daysToWait, 'days')
            .diff(moment(), 'days');
  }

  const sortConfig: SortConfig = { 
    order: sortFilterConfig.order, 
    key: sortFilterConfig.key 
  };

  const filterConfig: FilterConfig = { 
    status: sortFilterConfig.status, 
    source: sortFilterConfig.source 
  };

  const renderTableBody = () => {
    if (fetchingAll) return <LoadingSpinner />;
    return sortedBooks.map((book) => {
      const lastReadDate = moment(book.lastReadDate).format('MM-DD-YYYY');
      // LastReadDate + DaysToWait - TodaysDate
      const daysLeft = calculateDaysLeft(book)
      const customAttributes: CustomAttributes = {
        datatip: "data-tip",
        datafor: "data-for",
      }

      return (
        <ContextMenuTrigger 
          id="book-contextmenu" 
          renderTag="tr"
          key={book.id}
          attributes={{ 
            onContextMenu: () => dispatch(bookContextUpdateAction(book)),
            [customAttributes.datatip]: "",
            [customAttributes.datafor]: `${book.id}`,
          }}
        >
          <td>{book.title}</td>
          <td>{book.lastChapterRead}</td>
          <td>{book.rating}</td>
          <td>{lastReadDate}</td>
          <td>{daysLeft}</td>
          <>
            <ReactTooltip id={`${book.id}`} place="left" type="light" effect="solid">
              <img src={book.cover || ""} width="200" height="270" />
            </ReactTooltip>
          </>
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
    if (sortConfig.key === key && sortConfig.order === 'desc')
      order = 'asc';
    if (key === 'daysToWait' && order === 'desc') {
      query.delete('sortKey');
      query.delete('sortOrder');
    } else {
      query.set('sortKey', key);
      query.set('sortOrder', order);
    }
    historyPush(query);
    dispatch(setSortConfigAction({ key, order }));
  }

  const sortedBooks = React.useMemo(() => {
    let result = [...books];
    if (sortConfig !== null) {
      result.sort((a, b) => {
        if (sortConfig.key) {
          let first = a[sortConfig.key];
          let second = b[sortConfig.key];

          // convert daysToWait -> daysLeft
          if (sortConfig.key === 'daysToWait') {
            first = calculateDaysLeft(a);
            second = calculateDaysLeft(b);
          }

          if (first !== null && second !== null) {
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
    <div className={styles.container}>
      <div className={styles.title}>Book Shelf</div>
      <div className={styles.subContainer}>
        <Button 
          onClick={() => dispatch(bookCreateModalOpenAction())}
          variant="contained" 
          endIcon={<AddIcon />} 
          className={classes.button}>
          Add Book
        </Button>
      </div>
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
