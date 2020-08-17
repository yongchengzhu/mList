import { FC, useRef, MutableRefObject, useEffect } from 'react';
import { createPortal } from 'react-dom';

import styles from './Modal.module.scss';

const Modal: FC<{}> = (props) => {
  const containerRef: MutableRefObject<Element | null> = useRef(null);

  const getContainerElement = () => {
    if (!containerRef.current) {
      containerRef.current = document.createElement('div');
      containerRef.current.setAttribute('class', styles.modal);
    }
    return containerRef.current;
  };

  useEffect(() => {
    const root = document.querySelector('#modal-root');
    root?.appendChild(getContainerElement());

    return () => {
      root?.removeChild(getContainerElement());
    };
  }, []);

  return createPortal(props.children, getContainerElement());
};

export default Modal;