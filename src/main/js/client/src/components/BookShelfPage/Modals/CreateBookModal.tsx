import React, { FC, useRef, useEffect, MutableRefObject } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import Modal from '../../HOCs/Modal';
import styles from './CreateBookModal.module.scss';
import CreateBookForm from './CreateBookForm';
import { Book } from '../../../models/states';
import { bookCreateActionCreator } from '../../../redux/actions/book/create';
import { bookCreateModalCloseAction } from '../../../redux/actions/book/modal';
import { useQuery } from '../StatusSelector/common';
import { filterTable } from '../common';


const CreateBookModal: FC<{}> = () => {
  let query = useQuery();
  const dispatch = useDispatch();
  const contentRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const targetNode: EventTarget | null = e.target;
      if (!contentRef.current?.contains(targetNode as Node)) {
        dispatch(bookCreateModalCloseAction());
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [contentRef]);

  return (
    <Modal root="create-modal-root">
      <div ref={contentRef} className={styles.container}>
        <h1>Create Book</h1>
        <CreateBookForm onSubmit={(values: Book) => {
          values.lastReadDate = moment().format('DD-MM-YYYY HH:mm:ss');
          dispatch(bookCreateActionCreator(values, () => filterTable(query)));
        }} />
      </div>
    </Modal>
  );
};

export default CreateBookModal;
