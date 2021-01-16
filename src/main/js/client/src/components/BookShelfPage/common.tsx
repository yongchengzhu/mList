import { useLocation } from 'react-router-dom';

import history from '../../history';

export const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

export const historyPush = (query: URLSearchParams) => history.push({
  pathname: '/bookshelf',
  search: `?${query.toString()}`
});