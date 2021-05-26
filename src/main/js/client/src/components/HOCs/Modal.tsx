import { FC, useRef, MutableRefObject, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

import styles from './HOC.module.scss';

interface ModalProps {
  root: string;
}

const Modal: FC<ModalProps> = (props) => {
  const containerRef: MutableRefObject<Element | null> = useRef(null);

  const getContainerElement = useCallback(() => {
    if (!containerRef.current) {
      containerRef.current = document.createElement('div');
      containerRef.current.setAttribute('class', styles.modal);
      if (props.root === 'delete-modal-root') {
        containerRef.current.setAttribute('style', 'z-index: 1;');
      }
    }
    return containerRef.current;
  }, [props.root]);

  useEffect(() => {
    const root = document.querySelector(`#${props.root}`);
    root?.appendChild(getContainerElement());

    return () => {
      root?.removeChild(getContainerElement());
    };
  }, [getContainerElement, props.root]);

  return createPortal(props.children, getContainerElement());
};

export default Modal;
