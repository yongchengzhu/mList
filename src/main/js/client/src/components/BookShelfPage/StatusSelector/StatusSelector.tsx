import React, { FC } from 'react';

import styles from './StatusSelector.module.scss';

const StatusSelector: FC<{}> = () => {
  return (
    <aside>
      <div className={styles['status-selector']}>
        <span>
          <input
            type="radio"
            id="reading"
            name="status"
            value="reading"
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
          />
          <label htmlFor="dropped">Dropped</label>
        </span>

        <span>
          <input 
            type="radio" 
            id="axed" 
            name="status" 
            value="axed" 
          />
          <label htmlFor="axed">Axed</label>
        </span>

        <span>
          <input 
            type="radio" 
            id="planned" 
            name="status" 
            value="planned" 
          />
          <label htmlFor="planned">Planned</label>
        </span>

        <span>
          <input 
            type="radio" 
            id="completed" 
            name="status" 
            value="completed" 
          />
          <label htmlFor="completed">Completed</label>
        </span>

        <span>
          <input 
            type="radio" 
            id="all" 
            name="status" 
            value="all" 
          />
          <label htmlFor="all">All</label>
        </span>
      </div>
    </aside>
  );
};

export default StatusSelector;
