import axios from 'axios';

export class PixabayAPI {
  static BASE_URL = 'https://pixabay.com/api/';
  static API_KEY = '37389808-12bea4b2cb0bd7fcb8ca2392a';
  static perPage = 40;

  constructor() {
    this.page = 1;
    this.query = '';
  }

  fetchPhotosByQuery = async () => {
    const { page, query } = this;
    const searchParams = new URLSearchParams({
      key: PixabayAPI.API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: PixabayAPI.perPage,
      page,
    });

    try {
      const response = await axios.get(
        `${PixabayAPI.BASE_URL}?${searchParams}`
      );
      return response.data;
    } catch (error) {
      Notiflix.Notify.failure(`Something went wrong: ${error.message}`);
    }
  };
}
