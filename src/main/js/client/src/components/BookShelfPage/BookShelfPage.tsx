import React, { FC, useEffect } from 'react';
import StatusSelector from './StatusSelector/StatusSelector';
import BookTable from './BookTable/BookTable';

import styles from './BookShelfPage.module.scss';
import { useDispatch } from 'react-redux';
import { booksFetchActionCreator } from '../../redux/actions/book/fetchAll';

const BookShelfPage: FC<{}> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(booksFetchActionCreator());
  }, []);

  return (
    <main>
      <header>
        <h1>My Bookshelf</h1>
      </header>
      <section className={styles['status-table-container']}>
        <StatusSelector />
        <BookTable />
      </section>
    </main>
  );
};

export default BookShelfPage;
