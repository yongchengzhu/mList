// @ts-nocheck
import React, { FC } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import './StatusSelector.module.scss';
import styles from './StatusSelector.module.scss';
import { useQuery, historyPush } from '../common';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, FilterConfig } from '../../../models/states';
import { setFilterConfigAction } from '../../../redux/actions/book/filter';
import logo from '../../../assets/logo1.png';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import RemoveIcon from '@material-ui/icons/Remove';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import DoneIcon from '@material-ui/icons/Done';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import history from '../../../history'
import { signoutAction } from '../../../redux/actions/auth/signout';
import { bookCreateModalOpenAction } from '../../../redux/actions/book/modal';

const useStyles = makeStyles({
  button: {
    '&:hover': {
      'color': 'white',
      'background-color': '#f73378',
    },
    'margin': '15px 0',
    'border-radius': 0,
    'background-color': '#fff',
    'height': '45px',
    'width': '100%',
    'box-shadow': '0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14), 0px 9px 46px 8px rgba(0,0,0,0.12)',
    '& span': {
      'display': 'flex',
      'justify-content': 'space-between',
    },
  },
  alignBottom: {
    'vertical-align': 'bottom',
    'margin-right': '5px',
  },
  alignCenter: {
    'vertical-align': 'middle',
    'margin-right': '5px',
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
    <aside className={styles.aside}>
      <div className={styles.fixedContainer}>
        <div className={styles.container}>
          <div className={styles.logoContainer}>
            <img src={logo} width="115" height="115" />
            <div className={styles.logoTitle}>mList</div>
          </div>
          <Button 
            onClick={() => dispatch(bookCreateModalOpenAction())}
            variant="contained" 
            endIcon={<AddIcon />} 
            className={classes.button}>
            Add Book
          </Button>

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
              <BookmarkBorderIcon className={classes.alignBottom} />
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
              <DeleteOutlineIcon className={classes.alignBottom} />
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
              <RemoveIcon className={classes.alignBottom} />
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
              <CalendarTodayIcon className={classes.alignBottom} />
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
              <DoneIcon className={classes.alignBottom} />
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
              <span />
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
            <ExitToAppIcon className={classes.alignBottom} /> 
            Log Out
          </div>
        </div>

        {/* <h3>Source Filter:</h3>
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
        </div> */}
      </div>
    </aside>
  );
};

export default StatusSelector;
