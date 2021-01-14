import React, { FC } from 'react';
import { ContextMenuTrigger } from "react-contextmenu";
import moment from 'moment';

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
      const lastReadDate = moment(book.lastReadDate).utc().format("MM/DD/YYYY");
      const daysLeft     = moment(book.lastReadDate).utc()
        .add(book.daysToWait, 'days').utc()
        .diff(moment(book.lastReadDate).utc(), 'days');
      return (
        <ContextMenuTrigger 
          id="book-contextmenu" 
          renderTag="tr" 
          key={book.id} 
          attributes={{ onContextMenu: () => dispatch(bookContextUpdateAction(book))}}
        >
          <td>{book.title}</td>
          <td>{book.lastChapterRead}</td>
          <td>{book.rating}</td>
          <td>{lastReadDate}</td>
          <td>{daysLeft}</td>
        </ContextMenuTrigger>
      );
    });
  };

  // copy-pasta from w3school ('ω^＼)
  function sortTable(n: number) {
    let table: any, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("book-table");
    if (!table) return;
    switching = true;
    //Set the sorting direction to ascending:
    dir = "asc"; 
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
      //start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /*Loop through all table rows (except the
      first, which contains table headers):*/
      for (i = 1; i < (rows.length - 1); i++) {
        //start by saying there should be no switching:
        shouldSwitch = false;
        /*Get the two elements you want to compare,
        one from current row and one from the next:*/
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /*check if the two rows should switch place,
        based on the direction, asc or desc:*/
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            //if so, mark as a switch and break the loop:
            shouldSwitch= true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /*If a switch has been marked, make the switch
        and mark that a switch has been done:*/
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        //Each time a switch is done, increase this count by 1:
        switchcount ++;      
      } else {
        /*If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again.*/
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }

  return (
    <div>
      <table id="book-table">
        <thead>
          <tr>
            <th onClick={() => sortTable(0)}>Title</th>
            <th onClick={() => sortTable(1)}>Last Read</th>
            <th onClick={() => sortTable(2)}>Rating</th>
            <th onClick={() => sortTable(3)}>Read Since</th>
            <th onClick={() => sortTable(4)}>Days Left</th>
          </tr>
        </thead>
        <tbody>{renderTableBody()}</tbody>
      </table>
    </div>
  );
};

export default BookTable;
