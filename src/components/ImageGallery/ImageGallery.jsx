import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export default function ImageGallery({ images, onClick }) {
  return (
    <ul className={css.gallery}>
      {images.map(({ id, webformatURL, largeImageURL, alt }) => (
        <ImageGalleryItem
          key={id}
          imageURL={webformatURL}
          alt={alt}
          onClick={() => onClick({ imageURL: largeImageURL, alt })}
        />
      ))}
    </ul>
  );
}

ImageGallery.defaultProps = {
  images: [],
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number.isRequired })
  ).isRequired,
};
