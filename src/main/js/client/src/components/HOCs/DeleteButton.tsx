import React, { FC } from 'react';
import LoadingSpinner from '../Loaders/LoadingSpinner';
import { useDispatch } from 'react-redux';
import { bookDeleteActionCreator } from '../../redux/actions/book/delete';
import { Button, makeStyles } from '@material-ui/core';

interface Props {
  loading: boolean;
  id: number;
}

const useStyles = makeStyles({
  deleteButton: {
    'border-radius': 0,
    'height': '40px',
    'width': '125px',
  }
});

const DeleteButton: FC<Props> = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const renderDeleteButton = () => {
    switch (props.loading) {
      case true:
        return <LoadingSpinner />;
      case false:
        return (
        <Button
          className={`${classes.deleteButton}`}
          color="secondary"
          variant="contained"
          onClick={() => dispatch(bookDeleteActionCreator(props.id))}
        >
          Delete
        </Button>
        );
    }
  };

  return renderDeleteButton();
};

export default DeleteButton;