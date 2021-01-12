import React, { FC } from 'react';
import LoadingSpinner from '../Loaders/LoadingSpinner';
import { useDispatch } from 'react-redux';
import { bookDeleteActionCreator } from '../../redux/actions/book/delete';

interface Props {
  loading: boolean;
  id: number;
}

const DeleteButton: FC<Props> = (props) => {
  const dispatch = useDispatch();

  const renderDeleteButton = () => {
    switch (props.loading) {
      case true:
        return <LoadingSpinner />;
      case false:
        return <button onClick={() => dispatch(bookDeleteActionCreator(props.id))}>Delete</button>;
    }
  };

  return renderDeleteButton();
};

export default DeleteButton;