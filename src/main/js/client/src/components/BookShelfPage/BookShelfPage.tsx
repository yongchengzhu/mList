import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Client } from '@stomp/stompjs';

import StatusSelector from './StatusSelector/StatusSelector';
import BookTable from './BookTable/BookTable';
import styles from './BookShelfPage.module.scss';
import { booksFetchActionCreator } from '../../redux/actions/book/fetchAll';
import { RootState } from '../../models/states';

const BookShelfPage: FC<{}> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(booksFetchActionCreator());
  }, [dispatch]);

  return (
    <main className={styles.main} onContextMenu={(e) => e.preventDefault()}>
      <section className={styles['status-table-container']}>
        <StatusSelector />
        <BookTable />
      </section>
    </main>
  );
};

export default BookShelfPage;
