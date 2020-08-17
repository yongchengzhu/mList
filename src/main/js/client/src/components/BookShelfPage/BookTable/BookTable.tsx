import React, { FC } from 'react';

import './BookTable.module.scss';
import LoadingSpinner from '../../Loaders/LoadingSpinner';
import { useSelector } from 'react-redux';
import { RootState } from '../../../models/states';

const BookTable: FC<{}> = () => {
  const { fetchingAll, books } = useSelector((state: RootState) => state.book);

  const renderTableBody = () => {
    if (fetchingAll) return <LoadingSpinner />;
    return books.map((book) => {
      return (
        <tr key={book.id}>
          <td>{book.title}</td>
          <td>{book.author}</td>
          <td>{book.lastChapterRead}</td>
          <td>{book.rating}</td>
          <td>{book.lastReadDate}</td>
        </tr>
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
