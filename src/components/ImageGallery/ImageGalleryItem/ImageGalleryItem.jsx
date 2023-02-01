import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal } from 'components';
import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({
  imageData: { webformatURL, largeImageURL, alt },
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const hideModal = () => setIsModalOpen(false);

  return (
    <li className={css.item}>
      <img
        className={css.image}
        src={webformatURL}
        alt={alt}
        onClick={showModal}
      />
      {isModalOpen && (
        <Modal onClose={hideModal}>
          <img src={largeImageURL} alt={alt} />
        </Modal>
      )}
    </li>
  );
}

ImageGalleryItem.defaultProps = {
  imageData: {},
};

ImageGalleryItem.propTypes = {
  imageData: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }).isRequired,
};
