import debounce from 'lodash.debounce';
import './sass/main.scss';

import apiServise from './js/apiService.js';
import galleryTpl from './templates/gallery.hbs';

const refs = {
  input: document.querySelector('[name="query"]'),
  gallery: document.querySelector('.gallery'),
  showMoreBtn: document.querySelector('[data-action="show-more"]'),
  spinner: document.querySelector('.js-spinner'),
  btnSpinner: document.querySelector('.js-btn-spinner'),
  box: document.querySelector('.box'),
};

refs.input.addEventListener('input', debounce(handleInput, 1000));

function handleInput(event) {
  refs.spinner.classList.remove('is-hidden');

  clearBeforePopulating();

  const userInput = event.target.value;
  apiServise.query = userInput;

  apiServise
    .fetchImages()
    .then(data => {
      if (data.hits.length === 0) {
        alert('No matches, please try again!');
      } else {
        makeButtonActive();
        populateGallery(data);
      }
    })
    .catch(alert)
    .finally(makeSmoothScroll);
}

refs.showMoreBtn.addEventListener('click', handleMoreClick);

function handleMoreClick() {
  makeButtonNoActive();

  apiServise
    .fetchImages()
    .then(data => {
      populateGallery(data);

      refs.showMoreBtn.disabled = false;
      refs.btnSpinner.classList.add('is-hidden');
    })
    .catch(alert)
    .finally(makeSmoothScroll);
}

function clearBeforePopulating() {
  refs.gallery.innerHTML = '';
  apiServise.query = '';
  apiServise.pageNumber = 1;
}
function populateGallery(data) {
  const markUp = galleryTpl(data);
  refs.gallery.insertAdjacentHTML('beforeend', markUp);
  apiServise.pageNumber += 1;
}
function makeSmoothScroll() {
  refs.box.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}
function makeButtonNoActive() {
  refs.showMoreBtn.disabled = true;
  refs.btnSpinner.classList.remove('is-hidden');
}
function makeButtonActive() {
  refs.spinner.classList.add('is-hidden');
  refs.showMoreBtn.classList.remove('is-hidden');
}
