import React from 'react';
import { ContextMenu, MenuItem } from 'react-contextmenu';

import styles from './BookContextMenu.module.scss';

const BookContextMenu:React.FC<{}> = () => {
  return (
    <ContextMenu id="book-contextmenu" className={styles["book-contextmenu"]}>
      <MenuItem data={{foo: 'bar'}} className={styles["book-contextmenu-item"]}>
        Edit
      </MenuItem>
      <MenuItem data={{foo: 'bar'}} className={styles["book-contextmenu-item"]}>
        Delete
      </MenuItem>
    </ContextMenu>
  );
};

export default BookContextMenu;