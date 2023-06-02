import { searchForPhotos, scrollHandler } from './handlers';

const searchForm = document.querySelector('.search-form');

searchForm.addEventListener('submit', searchForPhotos);
searchForm.dispatchEvent(new Event('submit'));

window.addEventListener('scroll', scrollHandler);

// window.addEventListener('scroll', scrollHandler);
