import PropTypes from 'prop-types';
import css from './Button.module.css';

export default function Button({ children, onClick }) {
  return (
    <button className={css.button} type="button" onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};
