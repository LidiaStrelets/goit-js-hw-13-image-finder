import debounce from 'lodash.debounce';
import './sass/main.scss';
import apiServise from './js/apiService.js';
import galleryTpl from './templates/gallery.hbs';

const refs = {
  input: document.querySelector('[name="query"]'),
  gallery: document.querySelector('.gallery'),
};

refs.input.addEventListener('input', debounce(handleInput, 1000));

function handleInput(event) {
  const userInput = event.target.value;

  apiServise.fetchImages(userInput).then(data => {
    console.log(data);
    const markUp = galleryTpl(data);
    console.log(markUp);

    refs.gallery.insertAdjacentHTML('beforeend', markUp);
  });
}

// console.log(refs);
