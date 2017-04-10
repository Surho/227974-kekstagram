'use strict';
window.photoElement = (function() {
    
  function generetePhotosTemplate(photo) {
    var templatePhoto = document.querySelector('#picture-template').content;
    var photoTemplate = templatePhoto.cloneNode(true);
    photoTemplate.querySelector('img').src = photo.url;
    photoTemplate.querySelector('.picture-comments').textContent = photo.comments;
    photoTemplate.querySelector('.picture-likes').textContent = photo.likes;
    return photoTemplate;
  }

  function generetePhotoElement() {             
    var fragment=document.createDocumentFragment();
    for (var i = 0; i < data.photosObject.length; i++) {
    fragment.appendChild(generetePhotosTemplate(data.photosObject[i]));
    };
    return fragment;
  }

  return generetePhotoElement();

})(); 
