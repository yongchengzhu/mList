import React, { FC } from 'react';

import styles from './StatusSelector.module.scss';
import { useQuery, historyPush } from '../common';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, FilterConfig } from '../../../models/states';
import { setFilterConfigAction } from '../../../redux/actions/book/filter';

const StatusSelector: FC<{}> = () => {
  const dispatch = useDispatch();
  const {
    sortFilterConfig
  } = useSelector((state: RootState) => state.book);
  let query = useQuery();

  const filterConfig: FilterConfig = { 
    status: sortFilterConfig.status, 
    source: sortFilterConfig.source 
  };
  
  const handleSourceFilterChange = (e: any) => {
    const target = e.target;
    if (target.checked) {
      query.append(target.name, target.value);
      dispatch(setFilterConfigAction({ 
        ...filterConfig, 
        source: filterConfig.source.add(target.value) 
      }));
    }
    else {
      deleteParam(target.name, target.value);
      filterConfig.source.delete(target.value);
      dispatch(setFilterConfigAction({ 
        ...filterConfig, 
        source: filterConfig.source
      }));
    }
    historyPush(query);
  };

  const handleStatusFilterChange = (e: any) => {
    const target = e.target;
    if (target.value === 'reading') {
      query.delete(target.name);
    } else {
      query.set(target.name, target.value);
    }
    historyPush(query);
    dispatch(setFilterConfigAction({ ...filterConfig, status: target.value }));
  }

  const deleteParam = (key: string, value: string) => {
    const newQuery: any[string] = [];
    query.forEach((v: string, k: string) => {
      if (v !== value || k !== key) {
        newQuery.push(`${k}=${v}`);
      }
    });
    query = new URLSearchParams('?' + newQuery.join('&'));
  }

  return (
    <aside>
      <h3>Status Filter:</h3>
      <div className={styles['status-selector']}>
        <span>
          <input
            type="radio"
            id="reading"
            name="status"
            value="reading"
            onChange={handleStatusFilterChange}
            checked={"reading" === filterConfig.status}
          />
          <label htmlFor="reading">Reading</label>
        </span>

        <span>
          <input
            type="radio" 
            id="dropped" 
            name="status" 
            value="dropped"
            onChange={handleStatusFilterChange}
            checked={"dropped" === filterConfig.status}
          />
          <label htmlFor="dropped">Dropped</label>
        </span>

        <span>
          <input 
            type="radio" 
            id="axed" 
            name="status" 
            value="axed"
            onChange={handleStatusFilterChange}
            checked={"axed" === filterConfig.status}
          />
          <label htmlFor="axed">Axed</label>
        </span>

        <span>
          <input 
            type="radio" 
            id="planned" 
            name="status" 
            value="planned"
            onChange={handleStatusFilterChange}
            checked={"planned" === filterConfig.status}
          />
          <label htmlFor="planned">Planned</label>
        </span>

        <span>
          <input 
            type="radio" 
            id="completed" 
            name="status" 
            value="completed"
            onChange={handleStatusFilterChange}
            checked={"completed" === filterConfig.status}
          />
          <label htmlFor="completed">Completed</label>
        </span>

        <span>
          <input 
            type="radio" 
            id="all" 
            name="status" 
            value="all"
            onChange={handleStatusFilterChange}
            checked={"all" === filterConfig.status}
          />
          <label htmlFor="all">All</label>
        </span>
      </div>

      <h3>Source Filter:</h3>
      <div className={styles['status-selector']}>
        <span>
          <input
            type="checkbox"
            id="cn"
            name="language"
            value="cn"
            onChange={handleSourceFilterChange}
            checked={filterConfig.source.has("cn")}
          />
          <label htmlFor="cn">CN</label>
        </span>

        <span>
          <input
            type="checkbox" 
            id="kr" 
            name="language" 
            value="kr"
            onChange={handleSourceFilterChange}
            checked={filterConfig.source.has("kr")}
          />
          <label htmlFor="kr">KR</label>
        </span>

        <span>
          <input 
            type="checkbox" 
            id="jp" 
            name="language" 
            value="jp"
            onChange={handleSourceFilterChange}
            checked={filterConfig.source.has("jp")}
          />
          <label htmlFor="jp">JP</label>
        </span>        
      </div>
    </aside>
  );
};

export default StatusSelector;
