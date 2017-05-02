'use strict';
(function () {
  // удалил var pictures
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var closeButton = galleryOverlay.querySelector('.gallery-overlay-close');

  function onPopupEscPress(evtPress) {
    if (evtPress.keyCode === 27) {
      closePopup();
    }
  }

  function openPopup() {
    galleryOverlay.classList.remove('invisible');
    document.addEventListener('keydown', onPopupEscPress);
  }

  function closePopup() {
    galleryOverlay.classList.add('invisible');
    document.removeEventListener('keydown', onPopupEscPress);
  }

  function genereteGalleryOverlay(url, likes, comments) {
    galleryOverlay.querySelector('.gallery-overlay-image').src = url;
    galleryOverlay.querySelector('.likes-count').textContent = likes;
    galleryOverlay.querySelector('.comments-count').textContent = comments.length;
  }

  window.preview = {
    closeButton: closeButton,
    genereteGalleryOverlay: genereteGalleryOverlay,
    openPopup: openPopup,
    closePopup: closePopup
  };
})();
