import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../models/states';
import LoadingCurtain from './Loaders/LoadingCurtain';
import { checkTokenActionCreator } from '../redux/actions/auth/token';
import CreateBookModal from './BookShelfPage/Modals/CreateBookModal';
import DeleteBookModal from './BookShelfPage/Modals/DeleteBookModal';
import EditBookModal from './BookShelfPage/Modals/EditBookModal';

const useApp = () => {
  const dispatch = useDispatch();

  const checking: boolean = useSelector(
    (state: RootState) => state.auth.checking
  );

  const creatingBook: boolean = useSelector(
    (state: RootState) => state.book.showCreateModal
  );

  const deletingBook: boolean = useSelector(
    (state: RootState) => state.book.showDeleteModal
  );

  const editingBook: boolean = useSelector(
    (state: RootState) => state.book.showEditModal
  );

  const renderLoadingCurtain = () => {
    return checking ? <LoadingCurtain /> : null;
  };

  const renderCreateBookModal = () => {
    return creatingBook? <CreateBookModal /> : null;
  }

  const renderDeleteBookModal = () => {
    return deletingBook? <DeleteBookModal /> : null;
  }

  const renderEditBookModal = () => {
    return editingBook? <EditBookModal /> : null;
  }

  useEffect(() => {
    dispatch(checkTokenActionCreator());
  }, []);

  return [
    renderLoadingCurtain,
    renderCreateBookModal,
    renderDeleteBookModal,
    renderEditBookModal
  ];
};

export default useApp;
