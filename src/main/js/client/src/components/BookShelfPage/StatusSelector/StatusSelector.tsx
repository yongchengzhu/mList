import React, { FC } from 'react';

import styles from './StatusSelector.module.scss';
import { useQuery, historyPush } from '../common';

const StatusSelector: FC<{}> = () => {
  let query = useQuery();

  const handleSourceFilterChange = (e: any) => {
    const target = e.target;
    if (target.checked)
      query.append(target.name, target.value);
    else
      deleteParam(target.name, target.value);
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
            defaultChecked
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
          />
          <label htmlFor="jp">JP</label>
        </span>        
      </div>
    </aside>
  );
};

export default StatusSelector;
