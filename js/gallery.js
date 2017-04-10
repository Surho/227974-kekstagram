'use strict';
;(function () {

  function createPhotosFlow() {
    var picturesList = document.querySelector('.pictures');
    picturesList.appendChild(photoElement);
  }

  createPhotosFlow();

  var pictures = preview.pictures;

  pictures.addEventListener('click', function (evt) {
    evt.preventDefault();
    var target = evt.target;
    while (target !== pictures) {
      if (target.tagName === 'A') {
        var likes = target.querySelector('.picture-likes').textContent;
        var url = target.querySelector('img').getAttribute('src');
        preview.genereteGalleryOverlay(url, likes);
        preview.openPopup();
      }
      target = target.parentNode;
    }
  });

  preview.closeButton.addEventListener('click', function () {
    preview.closePopup();
  });

  preview.closeButton.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      preview.closePopup();
    }
  });
})();

