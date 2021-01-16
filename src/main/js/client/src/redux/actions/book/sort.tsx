import { ActionCreator } from 'redux';
import { SortConfigSetAction, SORT_CONFIG_SET } from '../../../models/actions/book';
import { SortConfig } from '../../../models/states';

export const setSortConfigAction: ActionCreator<SortConfigSetAction> = 
(sortConfig: SortConfig) => ({
  type: SORT_CONFIG_SET,
  sortConfig: sortConfig,
});