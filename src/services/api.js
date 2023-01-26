import axios from 'axios';

const AUTH_TOKEN = '30641317-2c1589b9e698647cbb48b6071';
const IMAGES_PER_PAGE = 12;

axios.defaults.baseURL = `https://pixabay.com/api/`;

const DEFAULT_GET_PARAMS = {
  key: AUTH_TOKEN,
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: IMAGES_PER_PAGE,
};

let query = '';
let page = 0;

const EMPTY_RESULT = {
  hasMoreImages: false,
  images: [],
};

export async function queryImages(newQuery) {
  const trimmedQuery = newQuery?.trim() || query;

  if (trimmedQuery.length === 0) {
    return EMPTY_RESULT;
  }

  page = query === trimmedQuery ? page + 1 : 1;
  query = trimmedQuery;

  try {
    const response = await axios.get('', {
      params: {
        ...DEFAULT_GET_PARAMS,
        q: query,
        page,
      },
    });

    const data = response.data;
    const totalPages = Math.ceil(data.totalHits / IMAGES_PER_PAGE);

    return {
      hasMoreImages: totalPages > page,
      images: data.hits.map(({ id, webformatURL, largeImageURL, tags }) => ({
        id,
        webformatURL,
        largeImageURL,
        alt: tags,
      })),
    };
  } catch {
    return EMPTY_RESULT;
  }
}
