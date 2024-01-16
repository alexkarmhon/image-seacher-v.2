const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '26677843-2a3fc57e20ccdb9e08e3bd20d';

export default class ImagesAPIservice {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.baseUrl = BASE_URL;
    this.key = API_KEY;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  incrPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  async fetchImagesByQuery() {
    const data = await fetch(`${this.baseUrl}?key=${this.key}&q=${this.query}&page=${this.page}&per_page=12`);
    return await data.json()
  }
}

// Приклад використання
// const images = new ImagesAPIservice();
// images.query = 'cat';
// images.fetchImagesByQuery()
