import { FC, useEffect, useMemo, useRef } from 'react';
import moment from 'moment';
import AddIcon from '@material-ui/icons/Add';
import FilterListIcon from '@material-ui/icons/FilterList';
import { Button, makeStyles } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';

import { useSelector, useDispatch } from 'react-redux';
import styles from './BookTable.module.scss';

import LoadingSpinner from '../../Loaders/LoadingSpinner';
import {
  RootState,
  SortConfigKey,
  SortConfigOrder,
  Source,
  SortConfig,
  FilterConfig,
  SortFilterConfig,
  FilterConfigStatus,
  Book,
} from '../../../models/states';
import { bookContextUpdateAction } from '../../../redux/actions/book/context';
import { setSortConfigAction } from '../../../redux/actions/book/sort';
import { useQuery, historyPush, deepEqual } from '../common';
import { initalSortFilterConfigState } from '../../../redux/reducers/common';
import {
  bookCreateModalOpenAction,
  bookEditModalOpenAction,
} from '../../../redux/actions/book/modal';
import { setFilterConfigAction } from '../../../redux/actions/book/filter';

const useStyles = makeStyles(() => ({
  button: {
    '&:hover': {
      color: 'white',
      'background-color': '#f73378',
    },
    margin: '15px 0',
    'border-radius': 0,
    'background-color': '#fff',
    'box-shadow':
      '0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14), 0px 9px 46px 8px rgba(0,0,0,0.12)',
    '& span': {
      display: 'flex',
      'justify-content': 'space-between',
    },
  },
  alignBottom: {
    verticalAlign: 'bottom',
    marginRight: '3px',
  },
}));

const BookTable: FC<{}> = () => {
  let query = useQuery();
  const prevQuery = useRef(query);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { fetchingAll, books, sortFilterConfig } = useSelector(
    (state: RootState) => state.book
  );

  useEffect(() => {
    if (!deepEqual(prevQuery.current, query)) {
      const queryConfig: SortFilterConfig = initalSortFilterConfigState;

      query.forEach((value, key) => {
        switch (key) {
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
        }
      });

      dispatch(setSortConfigAction(queryConfig));
    }
  }, [dispatch, query]);

  const sortConfig: SortConfig = useMemo(
    () => ({
      order: sortFilterConfig.order,
      key: sortFilterConfig.key,
    }),
    [sortFilterConfig.order, sortFilterConfig.key]
  );

  const filterConfig: FilterConfig = useMemo(
    () => ({
      status: sortFilterConfig.status,
      source: sortFilterConfig.source,
    }),
    [sortFilterConfig.status, sortFilterConfig.source]
  );

  const calculateDaysLeft = (book: Book) =>
    moment(book.lastReadDate)
      .add(book.daysToWait + 1, 'days')
      .diff(moment(), 'days');

  const sortedBooks = useMemo(() => {
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

      result = result.filter(
        (book) =>
          (!filterConfig.source.size ||
            filterConfig.source.has(book.language)) &&
          (filterConfig.status === 'all' || filterConfig.status === book.status)
      );
    }
    return result;
  }, [books, sortConfig, filterConfig]);

  const deleteParam = (key: string, value: string) => {
    const newQuery: any[string] = [];
    query.forEach((v: string, k: string) => {
      if (v !== value || k !== key) {
        newQuery.push(`${k}=${v}`);
      }
    });
    query = new URLSearchParams(`?${newQuery.join('&')}`);
  };

  const renderTableBody = () => {
    if (fetchingAll)
      return (
        <tr>
          <td>
            <LoadingSpinner />
          </td>
        </tr>
      );
    return sortedBooks.map((book) => {
      const lastReadDate = moment(book.lastReadDate).format('MM-DD-YYYY');
      // LastReadDate + DaysToWait - TodaysDate
      let daysLeft = calculateDaysLeft(book);

      if (daysLeft < 0) daysLeft = 0;

      return (
        <Tooltip
          key={book.id}
          title={
            <img alt="Cover" src={book.cover || ''} width="200" height="270" />
          }
          placement="left"
        >
          <tr
            key={book.id}
            onClick={() => {
              if (!window.getSelection()?.toString()) {
                dispatch(bookEditModalOpenAction());
                dispatch(bookContextUpdateAction(book));
              }
            }}
          >
            <td>{book.title}</td>
            <td>{book.lastChapterRead}</td>
            <td>{book.rating}</td>
            <td>{lastReadDate}</td>
            <td>{daysLeft}</td>
          </tr>
        </Tooltip>
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
    if (sortConfig.key === key && sortConfig.order === 'desc') order = 'asc';
    if (key === 'daysToWait' && order === 'asc') {
      query.delete('sortKey');
      query.delete('sortOrder');
    } else {
      query.set('sortKey', key);
      query.set('sortOrder', order);
    }
    historyPush(query);
    dispatch(setSortConfigAction({ key, order }));
  };

  const handleSourceFilterChange = (e: any) => {
    const { target } = e;
    if (target.checked) {
      query.append(target.name, target.value);
      dispatch(
        setFilterConfigAction({
          ...filterConfig,
          source: filterConfig.source.add(target.value),
        })
      );
    } else {
      deleteParam(target.name, target.value);
      filterConfig.source.delete(target.value);
      dispatch(
        setFilterConfigAction({
          ...filterConfig,
          source: filterConfig.source,
        })
      );
    }
    historyPush(query);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Book Shelf</div>
      <table className={styles.dummyTable}>
        <thead>
          <tr>
            <th className={styles.dummyHeader}>
              <div className={styles.dropdown}>
                <button type="button" className={styles.dropbtn}>
                  <FilterListIcon className={classes.alignBottom} />
                  Filter
                </button>
                {/* Dropdown */}
                <div className={styles['dropdown-content']}>
                  <div className={styles['status-selector']}>
                    <label htmlFor="cn">
                      <input
                        type="checkbox"
                        id="cn"
                        name="language"
                        value="cn"
                        onChange={handleSourceFilterChange}
                        checked={filterConfig.source.has('cn')}
                      />
                      <label htmlFor="cn">Manhua</label>
                    </label>

                    <label htmlFor="kr">
                      <input
                        type="checkbox"
                        id="kr"
                        name="language"
                        value="kr"
                        onChange={handleSourceFilterChange}
                        checked={filterConfig.source.has('kr')}
                      />
                      <label htmlFor="kr">Manwha</label>
                    </label>

                    <label htmlFor="jp">
                      <input
                        type="checkbox"
                        id="jp"
                        name="language"
                        value="jp"
                        onChange={handleSourceFilterChange}
                        checked={filterConfig.source.has('jp')}
                      />
                      <label htmlFor="jp">Manga</label>
                    </label>
                  </div>
                </div>
              </div>
              <Button variant="contained" className={classes.button}>
                Test
              </Button>
              <Button
                onClick={() => dispatch(bookCreateModalOpenAction())}
                variant="contained"
                endIcon={<AddIcon />}
                className={classes.button}
              >
                Add Book
              </Button>
            </th>
          </tr>
        </thead>
      </table>
      <table className={styles.bookTable}>
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
