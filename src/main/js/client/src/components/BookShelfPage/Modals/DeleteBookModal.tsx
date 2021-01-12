import React, { useEffect, MutableRefObject, useRef } from 'react';
import Modal from '../../HOCs/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { bookDeleteModalCloseAction } from '../../../redux/actions/book/modal';

import styles from './DeleteBookModal.module.scss';
import { RootState } from '../../../models/states';

const DeleteBookModal:React.FC<{}> = () => {
  const dispatch = useDispatch();
  const book = useSelector((state: RootState) => state.context);
  const contentRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const targetNode: EventTarget | null = e.target;
      if (!contentRef.current?.contains(targetNode as Node)) {
        dispatch(bookDeleteModalCloseAction());
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [contentRef]);

  return (
    <Modal root="delete-modal-root">
      <div ref={contentRef} className={styles.container}>
        <h1>Delete Book</h1>
        <div>
          Are you sure you want to delete this?
        </div>
        <div>
          { book.title }
        </div>
        <div>
          <button>Delete</button>
          <button>Cancel</button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteBookModal;