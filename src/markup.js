export const addGallery = imagesInfo => {
  const imagesArr = imagesInfo.map(imgInfo => {
    return `
    <a href ="${imgInfo.largeImageURL}">
    <div class="photo-card">
  <img src="${imgInfo.webformatURL}"width="300" height="200" alt="${imgInfo.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes${imgInfo.likes}</b>
    </p>
    <p class="info-item">
      <b>Views${imgInfo.views}</b>
    </p>
    <p class="info-item">
      <b>Comments${imgInfo.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads${imgInfo.downloads}</b>
    </p>
  </div>
</div></a>`;
  });
  return imagesArr.join('');
};
