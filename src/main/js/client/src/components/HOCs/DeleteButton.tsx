import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Button, makeStyles } from '@material-ui/core';
import LoadingSpinner from '../Loaders/LoadingSpinner';
import { bookDeleteActionCreator } from '../../redux/actions/book/delete';

interface Props {
  loading: boolean;
  id: number;
}

const useStyles = makeStyles({
  deleteButton: {
    'border-radius': 0,
    height: '40px',
    width: '125px',
  },
});

const DeleteButton: FC<Props> = ({ id, loading }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const loadingSpinner = <LoadingSpinner />;
  const deleteButton = (
    <Button
      className={`${classes.deleteButton}`}
      color="secondary"
      variant="contained"
      onClick={() => dispatch(bookDeleteActionCreator(id))}
    >
      Delete
    </Button>
  );

  return loading ? loadingSpinner : deleteButton;
};

export default DeleteButton;
