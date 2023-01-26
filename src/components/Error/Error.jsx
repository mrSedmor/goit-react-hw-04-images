import PropTypes from 'prop-types';
import css from './Error.module.css';

export default function Error({ message }) {
  return (
    <div className={css.error}>
      <p>Something goes wrong... Try again or reload the page</p>
      <p>Error message: {message}</p>
    </div>
  );
}
