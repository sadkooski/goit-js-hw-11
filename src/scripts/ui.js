import pingPixabay from './pixabay.js';

const getPhotoElement = photo => {
  //   const img = document.createElement('img');
  //   img.classList.add('photo');
  //   img.src = photo.webformatURL;
  //   console.log(img);
  const photoCard = `<div class="photo-card">
    <img class="photo" src="${photo.webformatURL}" alt="" loading="lazy" />
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
  //   console.log(photoCard);

  return photoCard;
  //   return img;
};

function drawPhotos({ photos, page }) {
  const photoContainer = document.querySelector('#gallery');
  if (page === '1') {
    photoContainer.innerHTML = '';
  }

  const children = photos.map(getPhotoElement);
  //   console.log(children.join(''));
  photoContainer.innerHTML += children.join('');
}

export async function loadPhotos({ q, page }) {
  const photos = await pingPixabay({ q, page });
  if (photos.error) {
    alert(photos.error);
    return;
  }
  drawPhotos({ photos, page });
  return;
}
