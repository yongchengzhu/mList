import { FC, MutableRefObject, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import Modal from '../../HOCs/Modal';
import { bookEditModalCloseAction } from '../../../redux/actions/book/modal';
import styles from './CreateEditDeleteBookModal.module.scss';
import EditBookForm from './EditBookForm';
import { Book } from '../../../models/states';
import { bookEditActionCreator } from '../../../redux/actions/book/edit';

const EditBookModal: FC<{}> = () => {
  const contentRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const targetNode: EventTarget | null = e.target;
      const deleteModal = document.querySelector('.delete-modal');
      const isSelect = document.querySelector('.MuiList-root');

      if (
        !contentRef.current?.contains(targetNode as Node) &&
        !deleteModal &&
        !isSelect
      ) {
        dispatch(bookEditModalCloseAction());
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [contentRef, dispatch]);

  return (
    <Modal root="edit-modal-root">
      <div ref={contentRef} className={styles.container}>
        <EditBookForm
          onSubmit={(values: Book | any) => {
            const bookInfo = { ...values };
            if (!values['is-read']) {
              bookInfo.lastReadDate = moment(values.lastReadDate)
                .utc()
                .format('DD-MM-YYYY HH:mm:ss');
            } else {
              bookInfo.lastReadDate = moment()
                .utc()
                .format('DD-MM-YYYY HH:mm:ss');
            }
            dispatch(bookEditActionCreator(bookInfo));
          }}
        />
      </div>
    </Modal>
  );
};

export default EditBookModal;
