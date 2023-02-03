import { useState, useEffect, useCallback } from 'react';
import * as api from 'services/api';
import { Searchbar, ImageGallery, Button, Loader, Error } from 'components';
import css from './App.module.css';

const STATUS = {
  INITIAL: 'initial',
  LOADING: 'loading',
  ERROR: 'error',
  LOADED: 'loaded',
  LOADED_ALL: 'loaded-all',
};

export default function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(null);
  const [query, setQuery] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(STATUS.INITIAL);

  useEffect(() => {
    if (!query) {
      return;
    }
    setStatus(STATUS.LOADING);

    api
      .queryImages({ page, query })
      .then(({ hasMoreImages, images: newImages }) => {
        setImages(images => [...images, ...newImages]);
        setStatus(hasMoreImages ? STATUS.LOADED : STATUS.LOADED_ALL);
      })
      .catch(error => {
        setError(error.message);
        setStatus(STATUS.ERROR);
      });
  }, [page, query]);

  const handleQueryImages = useCallback(
    newQuery => {
      if (!newQuery || newQuery === query) {
        return;
      }

      setPage(1);
      setQuery(newQuery);
      setImages([]);
    },
    [query]
  );

  const loadMore = useCallback(() => {
    setPage(page => page + 1);
  }, []);

  return (
    <div className={css.app}>
      <Searchbar
        onSubmit={handleQueryImages}
        isSubmitting={status === STATUS.LOADING}
      />

      <ImageGallery images={images} />

      {status === STATUS.ERROR && <Error message={error} />}

      {status === STATUS.LOADING && <Loader />}

      {status === STATUS.LOADED && (
        <Button onClick={loadMore}>Load more</Button>
      )}
    </div>
  );
}
