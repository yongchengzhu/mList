import { useEffect, useState } from 'react';

import { RouteComponentProps } from 'react-router';
import { AxiosError } from 'axios';
import server from '../../../apis/server';

const useTokenConfirm = (props: RouteComponentProps) => {
  const [message, setMessage] = useState('Confirming token, please wait...');

  useEffect(() => {
    const regex: RegExp = /\?token=(?<token>[^&]*)/;
    const match: RegExpMatchArray | null = props.location.search.match(regex);
    if (match && match.groups) {
      const { token } = match.groups;
      server
        .put(`/user/confirm?token=${token}`)
        .then(() =>
          setMessage('Email confirmation successful, your account is enabled.')
        )
        .catch((err: AxiosError) =>
          err.response
            ? setMessage(err.response.data.message)
            : setMessage('Request failed with empty response.')
        );
    } else {
      setMessage('Failed: Cannot extract valid token.');
    }
  }, [props.location.search]);

  return [message];
};

export default useTokenConfirm;
