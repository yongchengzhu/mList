import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../models/states';
import LoadingCurtain from './Loaders/LoadingCurtain';
import { checkTokenActionCreator } from '../redux/actions/auth/token';
import CreateBookModal from './BookShelfPage/Modals/CreateBookModal';

const useApp = () => {
  const dispatch = useDispatch();

  const checking: boolean = useSelector(
    (state: RootState) => state.auth.checking
  );

  const creatingBook: boolean = useSelector(
    (state: RootState) => state.book.showCreateModal
  );

  const renderLoadingCurtain = () => {
    return checking ? <LoadingCurtain /> : null;
  };

  const renderCreateBookModal = () => {
    return creatingBook? <CreateBookModal /> : null;
  }

  useEffect(() => {
    dispatch(checkTokenActionCreator());
  }, []);

  return [renderLoadingCurtain, renderCreateBookModal];
};

export default useApp;
