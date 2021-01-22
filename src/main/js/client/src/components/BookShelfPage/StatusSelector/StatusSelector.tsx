// @ts-nocheck
import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import RemoveIcon from '@material-ui/icons/Remove';
import DoneIcon from '@material-ui/icons/Done';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import './StatusSelector.module.scss';
import styles from './StatusSelector.module.scss';
import { useQuery, historyPush } from '../common';
import { RootState, FilterConfig } from '../../../models/states';
import { setFilterConfigAction } from '../../../redux/actions/book/filter';
import logo from '../../../assets/logo1.png';
import history from '../../../history'
import { signoutAction } from '../../../redux/actions/auth/signout';
import { setSortConfigAction } from '../../../redux/actions/book/sort';

const useStyles = makeStyles({
  alignCenter: {
    'vertical-align': 'middle',
    'margin-right': '10px',
  }
});

const StatusSelector: FC<{}> = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    sortFilterConfig
  } = useSelector((state: RootState) => state.book);
  let query = useQuery();

  const filterConfig: FilterConfig = { 
    status: sortFilterConfig.status, 
    source: sortFilterConfig.source 
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

  return (
    <aside className={styles.aside}>
      <div className={styles.fixedContainer}>
        <div className={styles.container}>
          <div className={styles.logoContainer}>
            <img 
              className={styles.logo}
              onClick={() => {
                history.push('/bookshelf');
                dispatch(setSortConfigAction({ key: 'daysToWait', order: 'asc' }))
              }}
              src={logo} 
              width="115" 
              height="115" 
            />
            <div className={styles.logoTitle}>mList</div>
          </div>
        </div>
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
            <label htmlFor="reading">
              <BookmarkBorderIcon className={classes.alignCenter} />
              Reading
            </label>
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
            <label htmlFor="dropped">
              <DeleteOutlineIcon className={classes.alignCenter} />
              Dropped
            </label>
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
            <label htmlFor="axed">
              <RemoveIcon className={classes.alignCenter} />
              Axed
            </label>
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
            <label htmlFor="planned">
              <CalendarTodayIcon className={classes.alignCenter} />
              Planned
            </label>
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
            <label htmlFor="completed">
              <DoneIcon className={classes.alignCenter} />
              Completed
            </label>
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
            <label htmlFor="all">
              <span className={styles.dummySpan} />
              All
            </label>
          </span>
        </div>

        <div className={styles.exitContainer}>
          <div 
            className={styles.signout}
            onClick={() => {
              history.push('/signin');
              localStorage.removeItem('mList-token');
              dispatch(signoutAction());
            }}>
            <ExitToAppIcon className={classes.alignCenter} /> 
            Log Out
          </div>
        </div>
      </div>
    </aside>
  );
};

export default StatusSelector;
