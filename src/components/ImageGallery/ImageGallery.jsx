import { memo } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

function ImageGallery({ images }) {
  return (
    <ul className={css.gallery}>
      {images.map(({ id, ...imageData }) => (
        <ImageGalleryItem key={id} imageData={imageData} />
      ))}
    </ul>
  );
}

export default memo(ImageGallery);

ImageGallery.defaultProps = {
  images: [],
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number.isRequired })
  ).isRequired,
};
