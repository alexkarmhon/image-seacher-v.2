import ImagesAPIservice from "./imageAPIservice";
import LoadMoreButton from "./load-more-btn";

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
  loadMoreButtonIsue.disable();

  const {hits, totalHits} = await imageAPIserviceIsue.fetchImagesByQuery();
  galleryLst.insertAdjacentHTML('beforeend', createMarkup(hits));

  if (hits.length * imageAPIserviceIsue.page >= totalHits) { loadMoreButtonIsue.hide() };

  loadMoreButtonIsue.enable();
}

function onLoadMoreBtnClick() {
  imageAPIserviceIsue.incrPage();
  renderGallery();
  galleryLst.scrollIntoView({
    behavior: "smooth",
    block: "end"
  })
} 

function onInputSubmit(e) {
  e.preventDefault();
  clearGallery();

  const value = e.target.elements.query.value.trim();
  if (!value) {
    clearGallery();
    return;
  };
  imageAPIserviceIsue.query = value;
  renderGallery();

  loadMoreButtonIsue.show();
  loadMoreBtn.addEventListener('click', onLoadMoreBtnClick)
}

formInput.addEventListener('submit', onInputSubmit);