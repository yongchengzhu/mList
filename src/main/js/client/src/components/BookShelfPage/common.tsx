import { useLocation } from 'react-router-dom';

import history from '../../history';

const isObject = (object: any) => object != null && typeof object === 'object';

export const useQuery = () => new URLSearchParams(useLocation().search);

export const historyPush = (query: URLSearchParams) =>
  history.push({
    pathname: '/bookshelf',
    search: `?${query.toString()}`,
  });

export const deepEqual = (object1: any, object2: any) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  const isFalse = keys1.some((key) => {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    return (
      (areObjects && !deepEqual(val1, val2)) || (!areObjects && val1 !== val2)
    );
  });

  return !isFalse;
};
