import React, { FC, useRef } from 'react';
import { ContextMenuTrigger } from 'react-contextmenu';
import { useDispatch } from 'react-redux';
import { bookContextUpdateAction } from '../../../redux/actions/book/context';
import { ContextMenuState, Book } from '../../../models/states';

interface Props {
  children?: React.ReactNode;
  book: Book;
}

const ContextMenuTriggerWrapper: FC<Props> = props => {
  const dispatch = useDispatch();
  const ref: any | null = useRef(null);

  return (
    <ContextMenuTrigger
      id="book-contextmenu"
      key={props.book.id}
      renderTag="tr"
      ref={ref}
      attributes={{
        onContextMenu: () => {
          const row = ref.current.elem.rowIndex;
          const context: ContextMenuState = {
            ...props.book,
            row: row,
          }
          dispatch(bookContextUpdateAction(context))
        },
      }}
    >
      {props.children}
    </ContextMenuTrigger>
  );
}

export default ContextMenuTriggerWrapper;