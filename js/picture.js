'use strict';
window.photoElement = (function () {

  function generetePhotosTemplate(photo) {
    var templatePhoto = document.querySelector('#picture-template').content;
    var photoTemplate = templatePhoto.cloneNode(true);
    photoTemplate.querySelector('img').src = photo.url;
    photoTemplate.querySelector('.picture-comments').textContent = photo.comments.length;
    photoTemplate.querySelector('.picture-likes').textContent = photo.likes;
    return photoTemplate;
  }

  function renderPhotos(data) {
    var picturesList = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();
    picturesList.innerHTML = '';
    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(generetePhotosTemplate(data[i]));
    }
    picturesList.appendChild(fragment);
  }

  var photos = [];

  function compare(a, b) {
    var diff = b.comments.length - a.comments.length;
    if (diff === 0) {
      diff = b.likes - a.likes;
    }
    return diff
  }

  function chaosSorting(a, b) {
    return Math.random() - 0.5;
  }

  function getRandomElements() {
    var randomTen = photos.slice().sort(chaosSorting).slice(0, 10);
    return randomTen;
  }
  
  function updateDiscussed() {
    var mostDiscussed = photos.slice();
    renderPhotos(mostDiscussed.sort(compare));
  }

  function updatePopular() {
    renderPhotos(photos);
  }

  function updateNew() {
    renderPhotos(getRandomElements());
  }
  
  var filters = document.querySelector('.filters');

  filters.addEventListener('click', function(evt) {
    var target = evt.target;
    switch(target.id) {
      case 'filter-discussed':
        debounce(updateDiscussed)
        break;
      case 'filter-popular':
        debounce(updatePopular)
        break;
      case 'filter-new':
        debounce(updateNew)
        break;
    }
  });

  function onLoad(pictures) {
    photos = pictures;
    filters.classList.remove('hidden');
    renderPhotos(pictures);
  }

  function onError(error) {
    var errorWindow = document.createElement('div');
    errorWindow.innerHTML = '<p>' + error + '</p>' + '<img src="img/icon-warning.png">';
    errorWindow.style = 'z-index: 100; transform: translate(-50%, -30%); border:2px solid #F9DA28; padding:10px 20px; box-shadow:2px 2px 10px 0px rgba(249,218,40,0.2); text-align: center';
    errorWindow.style.position = 'absolute';
    errorWindow.style.left = '50%';
    errorWindow.style.top = '30%';
    errorWindow.style.backgroundColor = '#232321';
    document.body.appendChild(errorWindow);
  }

  var url = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/kekstagram/data';

  window.load(url, onLoad, onError);
})();

