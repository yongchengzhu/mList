import { FC } from 'react';
import { RouteComponentProps } from 'react-router';

import useTokenConfirm from './useTokenConfirm';

const TokenConfirmPage: FC<RouteComponentProps> = (props) => {
  const [message]: any[] = useTokenConfirm(props);

  return <div>{message}</div>;
};

export default TokenConfirmPage;
