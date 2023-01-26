import { Component } from 'react';
import { queryImages } from 'services/api';
import { Searchbar, ImageGallery, Button, Loader, Modal } from 'components';
import css from './App.module.css';

export default class App extends Component {
  state = {
    images: [],
    isLoading: false,
    hasMoreImages: false,
    imageURL: null,
    alt: '',
  };

  loadImages = async query => {
    this.setState({ isLoading: true });
    if (query) {
      this.setState({ hasMoreImages: false, images: [] });
      window.scrollTo(0, 0);
    }
    const queryResult = await queryImages(query);
    const { hasMoreImages, images } = queryResult;

    this.setState(prevState => ({
      images: [...prevState.images, ...images],
      hasMoreImages,
    }));

    this.setState({ isLoading: false });
  };

  handleQueryImages = query => this.loadImages(query);
  loadMore = () => this.loadImages();
  handleGalleryClick = ({ imageURL, alt }) => {
    this.setState({ imageURL, alt });
  };

  hideModal = () => {
    this.setState({ imageURL: null });
  };

  render() {
    const { isLoading, hasMoreImages, images, imageURL, alt } = this.state;
    const hasImages = images.length > 0;
    const isModalVisible = Boolean(imageURL);

    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handleQueryImages} />

        {hasImages && (
          <ImageGallery images={images} onClick={this.handleGalleryClick} />
        )}

        {isLoading && <Loader />}

        {hasMoreImages && !isLoading && (
          <Button onClick={this.loadMore}>Load more</Button>
        )}

        {isModalVisible && (
          <Modal onClose={this.hideModal}>
            <img src={imageURL} alt={alt} />
          </Modal>
        )}
      </div>
    );
  }
}
