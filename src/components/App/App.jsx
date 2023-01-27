import { Component } from 'react';
import { queryImages } from 'services/api';
import { Searchbar, ImageGallery, Button, Loader, Error } from 'components';
import css from './App.module.css';

const STAGE = {
  INITIAL: 'initial',
  LOADING: 'loading',
  ERROR: 'error',
  LOADED: 'loaded',
  LOADED_ALL: 'loaded-all',
};

export default class App extends Component {
  state = {
    images: [],
    page: null,
    query: null,
    error: null,
    stage: STAGE.INITIAL,
  };

  componentDidUpdate(prevProps, prevState) {
    const { page: prevPage, query: prevQuery } = prevState;
    const { page, query, images } = this.state;
    if (page === prevPage && query === prevQuery) {
      return;
    }

    this.setState({
      stage: STAGE.LOADING,
    });

    queryImages({ page, query })
      .then(({ hasMoreImages, images: newImages }) =>
        this.setState({
          stage: hasMoreImages ? STAGE.LOADED : STAGE.LOADED_ALL,
          images: [...images, ...newImages],
        })
      )
      .catch(error =>
        this.setState({ stage: STAGE.ERROR, error: error.message })
      );
  }

  handleQueryImages = query => {
    if (!query) {
      return;
    }

    this.setState({ page: 1, query, images: [] });
  };

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  render() {
    const { images, error, stage } = this.state;

    return (
      <div className={css.app}>
        <Searchbar
          onSubmit={this.handleQueryImages}
          isSubmitting={stage === STAGE.LOADING}
        />

        <ImageGallery images={images} />

        {stage === STAGE.ERROR && <Error message={error} />}

        {stage === STAGE.LOADING && <Loader />}

        {stage === STAGE.LOADED && (
          <Button onClick={this.loadMore}>Load more</Button>
        )}
      </div>
    );
  }
}
