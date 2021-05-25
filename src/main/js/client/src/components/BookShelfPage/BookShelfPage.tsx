import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Client } from '@stomp/stompjs';

import StatusSelector from './StatusSelector/StatusSelector';
import BookTable from './BookTable/BookTable';
import styles from './BookShelfPage.module.scss';
import { booksFetchActionCreator } from '../../redux/actions/book/fetchAll';
import BookContextMenu from '../ContextMenus/BookContextMenu';

const prepareBrokerURL = (path: string): string => {
  const url = new URL(path, window.location.href);
  url.protocol = url.protocol.replace('http', 'ws');
  return url.href;
};


const BookShelfPage: FC<{}> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const client = new Client({ brokerURL: prepareBrokerURL('/chat') });

    client.activate();

    client.onConnect = () => {
      console.log('Connected to Web Socket ;)')

      client.subscribe('/user/queue/messages', message => {
        console.log('Message received: ' + message.body);
      });
  
      client.publish({
        destination: '/app/chat', 
        body: JSON.stringify({'from': "meow", 'text': "KEKW"})
      });
    };
    dispatch(booksFetchActionCreator());
  }, [dispatch]);

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
