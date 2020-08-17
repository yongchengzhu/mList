import React, { FC, useRef, useEffect, MutableRefObject } from 'react';
import Modal from '../../HOCs/Modal';
import { useDispatch } from 'react-redux';
import { bookCreateModalCloseAction } from '../../../redux/actions/book/modal';

import CreateBookForm from './CreateBookForm';
import { bookCreateActionCreator } from '../../../redux/actions/book/create';

import styles from './CreateBookModal.module.scss';

const CreateBookModal: FC<{}> = () => {
  const contentRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const dispatch = useDispatch();

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
    <Modal>
      <div ref={contentRef} className={styles.container}>
        <h1>Create Book</h1>
        <CreateBookForm onSubmit={values => dispatch(bookCreateActionCreator(values))} />
      </div>
    </Modal>
  );
};

export default CreateBookModal;
