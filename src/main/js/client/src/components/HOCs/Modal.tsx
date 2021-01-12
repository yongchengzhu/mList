import { FC, useRef, MutableRefObject, useEffect } from 'react';
import { createPortal } from 'react-dom';

import styles from './Modal.module.scss';

interface ModalProps {
  root: string,
}

const Modal: FC<ModalProps> = (props) => {
  const containerRef: MutableRefObject<Element | null> = useRef(null);

  const getContainerElement = () => {
    if (!containerRef.current) {
      containerRef.current = document.createElement('div');
      containerRef.current.setAttribute('class', styles.modal);
    }
    return containerRef.current;
  };

  useEffect(() => {
    const root = document.querySelector(`#${props.root}`);
    root?.appendChild(getContainerElement());

    return () => {
      root?.removeChild(getContainerElement());
    };
  }, []);

  return createPortal(props.children, getContainerElement());
};

export default Modal;