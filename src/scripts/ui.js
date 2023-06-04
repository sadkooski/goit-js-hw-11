import pingPixabay from './pixabay.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';

export let gallery;
export let photoContainer;

const getPhotoElement = photo => {
  const photoCard = `<div class="photo-card">
  <a class="gallery__item" href="${photo.largeImageURL}">
    <img class="photo" src="${photo.webformatURL}" alt="" loading="lazy" />
    </a>
    <div class="info">
      <p class="info-item">
        <b>Likes</b> ${photo.likes}
      </p>
      <p class="info-item">
        <b>Views</b> ${photo.views}
      </p>
      <p class="info-item">
        <b>Comments</b> ${photo.comments}
      </p>
      <p class="info-item">
        <b>Downloads</b> ${photo.downloads}
      </p>
    </div>
  </div>
  `;

  return photoCard;
};

function drawPhotos({ photos, page }) {
  photoContainer = document.querySelector('#gallery');

  if (page === '1') {
    photoContainer.innerHTML = '';
  }
  if (photos[0] === undefined) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  } else {
    Notiflix.Notify.success(`Hooray! We found ${photos.length} images`);
    gallery = photos.map(getPhotoElement);
    photoContainer.innerHTML += gallery.join('');
  }

  new SimpleLightbox('.gallery a', {
    captionDelay: 250,
  });
}

export async function loadPhotos({ q, page }) {
  const photos = await pingPixabay({ q, page });
  if (photos.error) {
    alert(photos.error);
    return;
  }

  drawPhotos({ photos, page });
}
