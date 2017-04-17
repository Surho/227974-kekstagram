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

  function onLoad(item) {
    var picturesList = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < item.length; i++) {
      fragment.appendChild(generetePhotosTemplate(item[i]));
    }
    picturesList.appendChild(fragment);
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

