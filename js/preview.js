'use strict';

window.preview = (function () {

  var pictures = document.querySelector('.pictures');
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

  function genereteGalleryOverlay(url, likes) {
    galleryOverlay.querySelector('.gallery-overlay-image').src = url;
    galleryOverlay.querySelector('.likes-count').textContent = likes;
    galleryOverlay.querySelector('.comments-count').textContent = data.genereteNumber(0, 25);
  }

  return {
    pictures: pictures,
    galleryOverlay: galleryOverlay,
    closeButton: closeButton,
    genereteGalleryOverlay: genereteGalleryOverlay,
    openPopup: openPopup,
    closePopup: closePopup
  };
})();



