import React from 'react';
import { ContextMenu, MenuItem } from 'react-contextmenu';
import { useDispatch } from 'react-redux';

import styles from './BookContextMenu.module.scss';
import { bookDeleteModalOpenAction, bookEditModalOpenAction } from '../../redux/actions/book/modal';

interface Props {
  children: React.ReactNode,
  key: number,
};

const BookContextMenu:React.FC<{}> = props => {
  const dispatch = useDispatch();

  return (
    <ContextMenu id="book-contextmenu" className={styles["book-contextmenu"]}>
      <MenuItem 
        className={styles["book-contextmenu-item"]}
        onClick  ={() => { dispatch(bookEditModalOpenAction()) }}
      >
        Edit
      </MenuItem>
      <MenuItem 
        className={styles["book-contextmenu-item"]} 
        onClick  ={() => { dispatch(bookDeleteModalOpenAction()) }}
      >
        Delete
      </MenuItem>
    </ContextMenu>
  );
};

export default BookContextMenu;