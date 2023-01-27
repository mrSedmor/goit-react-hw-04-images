import PropTypes from 'prop-types';
import { Component } from 'react';
import { Modal } from 'components';
import css from './ImageGalleryItem.module.css';

export default class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  showModal = () => this.setState({ isModalOpen: true });
  hideModal = () => this.setState({ isModalOpen: false });

  render() {
    const { webformatURL, largeImageURL, alt } = this.props.imageData;
    const { isModalOpen } = this.state;

    return (
      <li className={css.item}>
        <img
          className={css.image}
          src={webformatURL}
          alt={alt}
          onClick={this.showModal}
        />
        {isModalOpen && (
          <Modal onClose={this.hideModal}>
            <img src={largeImageURL} alt={alt} />
          </Modal>
        )}
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  imageData: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }),
};
