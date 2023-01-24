import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ imageURL, alt, onClick }) {
  return (
    <li className={css.item} onClick={onClick}>
      <img className={css.image} src={imageURL} alt={alt} />
    </li>
  );
}

ImageGalleryItem.defaultProps = {
  alt: '',
};

ImageGalleryItem.propTypes = {
  imageURL: PropTypes.string.isRequired,
  alt: PropTypes.string,
  onClick: PropTypes.func,
};
