import React, { FC, useEffect } from 'react';

import StatusSelector from './StatusSelector/StatusSelector';
import BookTable from './BookTable/BookTable';
import styles from './BookShelfPage.module.scss';
import { useDispatch } from 'react-redux';
import { booksFetchActionCreator } from '../../redux/actions/book/fetchAll';
import BookContextMenu from '../ContextMenus/BookContextMenu';

const BookShelfPage: FC<{}> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(booksFetchActionCreator());
  }, []);

  return (
    <main className={styles.main} onContextMenu={e => e.preventDefault()}>
      <section className={styles['status-table-container']}>
        <StatusSelector />
        <BookTable />
      </section>
      <BookContextMenu />
    </main>
  );
};

export default BookShelfPage;
