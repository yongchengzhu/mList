import React, { useEffect, MutableRefObject, useRef } from 'react';
import Modal from '../../HOCs/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { bookDeleteModalCloseAction } from '../../../redux/actions/book/modal';

import modalStyles from './CreateEditDeleteBookModal.module.scss';
import formStyles from './CreateEditDeleteForm.module.scss';
import commonStyles from './CommonForm.module.scss';
import { RootState } from '../../../models/states';
import DeleteButton from '../../HOCs/DeleteButton';
import ErrorMessage from '../../HOCs/ErrorMessage';
import { Button } from '@material-ui/core';
import { useFormStyles } from './common';

const DeleteBookModal:React.FC<{}> = () => {
  const classes = useFormStyles();
  const { 
    deleting: loading,
    deleteError: error
  } = useSelector((state: RootState) => state.book);
  const book = useSelector((state: RootState) => state.context);
  const dispatch = useDispatch();
  const contentRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      e.stopPropagation();
      const targetNode: EventTarget | null = e.target;
      if (!contentRef.current?.contains(targetNode as Node)) {
        dispatch(bookDeleteModalCloseAction());
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [contentRef, dispatch]);

  return (
    <Modal root="delete-modal-root">
      <div ref={contentRef} className={`${modalStyles.container} delete-modal`}>
        <div className={commonStyles.container}>
          <div className={commonStyles.title}>Delete Book</div>
          <ErrorMessage error={error} />
          <div>
            <p>Are you sure you want to delete <span className={commonStyles.bookTitle}>{book.title}</span> from your bookself?</p>
          </div>
        </div>
        <div className={formStyles.modalFooter}>
          <DeleteButton loading={loading} id={book.id} />
          <Button
            onClick={() => dispatch(bookDeleteModalCloseAction())}
            className={classes.button}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteBookModal;