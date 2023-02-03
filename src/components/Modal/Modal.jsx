import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ children, onClose }) {
  useEffect(() => {
    document.documentElement.classList.add(css.blockScroll);
    return () => {
      document.documentElement.classList.remove(css.blockScroll);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = ({ code }) => {
      if (code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleClick = useCallback(
    ({ target, currentTarget }) => {
      if (target === currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  return createPortal(
    <div className={css.overlay} onClick={handleClick}>
      <div className={css.modal}>{children}</div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};
