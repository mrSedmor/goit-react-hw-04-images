import { Component } from 'react';
import { queryImages } from 'services/api';
import {
  Searchbar,
  ImageGallery,
  Button,
  Loader,
  Modal,
  Error,
} from 'components';
import css from './App.module.css';

export default class App extends Component {
  state = {
    images: [],
    isLoading: false,
    hasMoreImages: false,
    imageURL: null,
    alt: null,
    page: null,
    query: null,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { page: prevPage, query: prevQuery } = prevState;
    const { page, query, images } = this.state;
    if (page === prevPage && query === prevQuery) {
      return;
    }

    this.setState({
      isLoading: true,
      error: null,
      hasMoreImages: false,
    });

    queryImages({ page, query })
      .then(({ hasMoreImages, images: newImages }) =>
        this.setState({
          hasMoreImages,
          images: [...images, ...newImages],
        })
      )
      .catch(error => this.setState({ error: error.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  handleQueryImages = query => {
    if (!query || query === this.state.query) {
      return;
    }

    this.setState({ page: 1, query, images: [] });
  };

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  handleGalleryClick = ({ imageURL, alt }) => {
    this.setState({ imageURL, alt });
  };

  hideModal = () => {
    this.setState({ imageURL: null });
  };

  render() {
    const { isLoading, hasMoreImages, images, imageURL, alt, error } =
      this.state;
    const hasImages = images.length > 0;
    const isModalVisible = Boolean(imageURL);

    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handleQueryImages} isSubmitting={isLoading} />

        {error && <Error message={error} />}

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
