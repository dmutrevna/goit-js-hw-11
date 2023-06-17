import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { PixabayAPI } from './api';
import { addGallery } from './markup';

const form = document.querySelector('#search-form');
const galleryList = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');

const pixabayAPI = new PixabayAPI();
const lightbox = new SimpleLightbox('.gallery a');

const handlerForm = async event => {
  event.preventDefault();
  const searchQuery = event.target.elements.searchQuery.value.trim();
  if (searchQuery === '') {
    Notiflix.Notify.warning('Please enter a search query.');
    return;
  }

  pixabayAPI.page = 1;
  pixabayAPI.query = searchQuery;

  try {
    const data = await pixabayAPI.fetchPhotosByQuery();

    if (data.totalHits === 0) {
      galleryList.innerHTML = '';
      return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else galleryList.innerHTML = addGallery(data.hits);
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    lightbox.refresh();
    btnLoadMore.style.display = 'block';
  } catch (error) {
    Notiflix.Notify.failure(`Something went wrong: ${error.message}`);
  }
};

const handlerLoadMore = async () => {
  pixabayAPI.page += 1;

  try {
    const data = await pixabayAPI.fetchPhotosByQuery();

    galleryList.insertAdjacentHTML('beforeend', addGallery(data.hits));

    if (data.totalPages === 0) {
      Notiflix.Notify.failure('No more images to load.');
      return;
    }

    if (pixabayAPI.page === data.totalPages) {
      btnLoadMore.style.display = 'none';
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (error) {
    Notiflix.Notify.failure(`Something went wrong: ${error.message}`);
  }
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
};

form.addEventListener('submit', handlerForm);
btnLoadMore.addEventListener('click', handlerLoadMore);
