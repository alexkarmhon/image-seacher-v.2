import ImagesAPIservice from "./imageAPIservice";
import LoadMoreButton from "./load-more-btn";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formInput = document.getElementById('search-form');
const galleryLst = document.getElementById('gallery-list');
const loadMoreBtn = document.getElementById('moreBtn');

const imageAPIserviceIsue = new ImagesAPIservice();
const loadMoreButtonIsue = new LoadMoreButton({
  selector: '[data-action="load-more"]',
  hidden: true
});


function createMarkup(arr) {
  return arr.map((item) => `
  <li class="gallery-item">
        <div class="photo-card">
          <div class="gallery-image-box">
            <img class="gallery-image" src="${item.webformatURL}" alt="${item.tags}" />
          </div>
          <div class="stats">
            <p class="stats-item">
              <i class="material-icons">thumb_up</i>
              ${item.likes}
            </p>

            <p class="stats-item">
              <i class="material-icons">visibility</i>
              ${item.views}
            </p>

            <p class="stats-item">
              <i class="material-icons">comment</i>
              ${item.comments}
            </p>

            <p class="stats-item">
              <i class="material-icons">cloud_download</i>
              ${item.downloads}
            </p>
          </div>
        </div>
      </li>
  `).join('');
}

function clearGallery() {
  // formInput.reset();
  imageAPIserviceIsue.resetPage();
  galleryLst.innerHTML = '';
  loadMoreButtonIsue.hide();
}

async function renderGallery() {
  try {
    loadMoreButtonIsue.disable();
  
    const {hits, totalHits} = await imageAPIserviceIsue.fetchImagesByQuery();
    galleryLst.insertAdjacentHTML('beforeend', createMarkup(hits));
  
    if (hits.length * imageAPIserviceIsue.page >= totalHits) { loadMoreButtonIsue.hide() };
  
    galleryLst.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
    loadMoreButtonIsue.enable(); 
    loadMoreButtonIsue.show();

  
  } catch {
    Notify.failure('Ooops!', {
      className: "error-notification",
      borderRadius: "10px"
    });
  }

}

function onLoadMoreBtnClick() {
  imageAPIserviceIsue.incrPage();
  renderGallery();
} 

function onInputSubmit(e) {
  e.preventDefault();
  clearGallery();

  const value = e.target.elements.query.value.trim();
  if (!value) {
    Notify.warning("Please enter some query", {
      className: "warning-notification",
      borderRadius: "10px"
    })
    clearGallery();
    return;
  };
  imageAPIserviceIsue.query = value;
  
  renderGallery();
}

loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
formInput.addEventListener('submit', onInputSubmit);