import React, { FC } from 'react';
import LoadingSpinner from '../Loaders/LoadingSpinner';

interface Props {
  loading: boolean;
}

const SubmitButton: FC<Props> = (props) => {
  const renderSubmitButton = () => {
    switch (props.loading) {
      case true:
        return <LoadingSpinner />;
      case false:
        return <input type="submit" />;
    }
  };

  return renderSubmitButton();
};

export default SubmitButton;