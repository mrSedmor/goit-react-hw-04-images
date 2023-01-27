import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import { useState } from 'react';
import { Modal } from 'components';

export default function ImageGallery({ images }) {
  const [imageData, setImageData] = useState(null);
  return (
    <>
      <ul className={css.gallery}>
        {images.map(({ id, webformatURL, largeImageURL, alt }) => (
          <ImageGalleryItem
            key={id}
            imageURL={webformatURL}
            alt={alt}
            onClick={() => setImageData({ imageURL: largeImageURL, alt })}
          />
        ))}
      </ul>
      {imageData && (
        <Modal onClose={() => setImageData(null)}>
          <img src={imageData.imageURL} alt={imageData.alt} />
        </Modal>
      )}
    </>
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
