import ReactDOM from 'react-dom';
import React, { FC, useEffect, useRef, MutableRefObject } from 'react';

import LoadingSpinner from './LoadingSpinner';

import styles from './LoadingCurtain.module.scss';

const LoadingCurtain: FC<{}> = () => {
  const containerRef: MutableRefObject<Element | null> = useRef(null);

  const getContainerElement = () => {
    if (!containerRef.current) {
      containerRef.current = document.createElement('div');
      containerRef.current.setAttribute('class', styles['loading-curtain']);
    }

    return containerRef.current;
  };

  useEffect(() => {
    const root = document.querySelector('#curtain-root');
    root?.appendChild(getContainerElement());

    return () => {
      root?.removeChild(getContainerElement());
    };
  }, []);

  return ReactDOM.createPortal(<LoadingSpinner />, getContainerElement());
};

export default LoadingCurtain;
