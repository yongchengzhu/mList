import { ActionCreator } from 'redux';
import { FilterConfigSetAction, FILTER_CONFIG_SET } from '../../../models/actions/book';
import { FilterConfig } from '../../../models/states';

export const setFilterConfigAction: ActionCreator<FilterConfigSetAction> = 
(filterConfig: FilterConfig) => ({
  type: FILTER_CONFIG_SET,
  filterConfig: filterConfig,
});