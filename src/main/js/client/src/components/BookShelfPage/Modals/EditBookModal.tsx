import React, { FC, MutableRefObject, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import Modal from '../../HOCs/Modal';
import { bookEditModalCloseAction } from '../../../redux/actions/book/modal';
import styles from './EditBookModal.module.scss';
import EditBookForm from './EditBookForm';
import { Book } from '../../../models/states';
import { bookEditActionCreator } from '../../../redux/actions/book/edit';

const EditBookModal: FC<{}> = () => {
  const contentRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const targetNode: EventTarget | null = e.target;
      if (!contentRef.current?.contains(targetNode as Node)) {
        dispatch(bookEditModalCloseAction());
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [contentRef]);

  return (
    <Modal root="edit-modal-root">
      <div ref={contentRef} className={styles.container}>
        <h1>Edit Book</h1>
        <EditBookForm onSubmit={(values: Book | any) => {
          if (!values['is-read']) {
            values.lastReadDate = moment(values.lastReadDate).utc().format('DD-MM-YYYY HH:mm:ss');
          } else {
            values.lastReadDate = moment().utc().format('DD-MM-YYYY HH:mm:ss');
          }
          dispatch(bookEditActionCreator(values));
        }} />
      </div>
    </Modal>
  );
};

export default EditBookModal;