import PropTypes from 'prop-types';

export default function ImageGalleryItem({
  imageURL,
  largeImageURL,
  alt,
  onClick,
}) {
  return (
    <li className="ImageGalleryItem" onClick={onClick}>
      <img className="ImageGalleryItem-image" src={imageURL} alt={alt} />
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
