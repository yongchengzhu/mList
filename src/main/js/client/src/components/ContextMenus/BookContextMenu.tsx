import React from 'react';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import { useDispatch } from 'react-redux';

import styles from './BookContextMenu.module.scss';
import { bookDeleteModalOpenAction } from '../../redux/actions/book/modal';

interface Props {
  children: React.ReactNode,
  key: number,
};

const BookContextMenu:React.FC<{}> = props => {
  const dispatch = useDispatch();

  return (
    <ContextMenu id="book-contextmenu" className={styles["book-contextmenu"]}>
      <MenuItem data={{foo: 'bar'}} className={styles["book-contextmenu-item"]}>
        Edit
      </MenuItem>
      <MenuItem 
        data     ={{foo: 'bar'}} 
        className={styles["book-contextmenu-item"]} 
        onClick  ={() => { console.log('Clicked'); dispatch(bookDeleteModalOpenAction())}}
      >
        Delete
      </MenuItem>
    </ContextMenu>
  );
};

export default BookContextMenu;