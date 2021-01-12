import React, { FC } from 'react';
import { ContextMenuTrigger } from "react-contextmenu";

import './BookTable.module.scss';
import LoadingSpinner from '../../Loaders/LoadingSpinner';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../models/states';
import { bookContextUpdateAction } from '../../../redux/actions/book/context';

const BookTable: FC<{}> = () => {
  const dispatch = useDispatch();
  const { fetchingAll, books } = useSelector((state: RootState) => state.book);

  const renderTableBody = () => {
    if (fetchingAll) return <LoadingSpinner />;
    return books.map((book) => {
      return (
        <ContextMenuTrigger 
          id="book-contextmenu" 
          renderTag="tr" 
          key={book.id} 
          attributes={{ onContextMenu: () => dispatch(bookContextUpdateAction(book))}}
        >
          <td>{book.title}</td>
          <td>{book.author}</td>
          <td>{book.lastChapterRead}</td>
          <td>{book.rating}</td>
          <td>{book.lastReadDate}</td>
        </ContextMenuTrigger>
      );
    });
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Last Read</th>
            <th>Rating</th>
            <th>Read Since</th>
          </tr>
        </thead>
        <tbody>{renderTableBody()}</tbody>
      </table>
    </div>
  );
};

export default BookTable;
