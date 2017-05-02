'use strict';
(function () {
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var closeButton = galleryOverlay.querySelector('.gallery-overlay-close');
  var constants = window.constants;
  var overlayImage = galleryOverlay.querySelector('.gallery-overlay-image');
  var overlayLikes = galleryOverlay.querySelector('.likes-count');
  var overlayComments = galleryOverlay.querySelector('.comments-count');

  function onPopupEscPress(evtPress) {
    if (evtPress.keyCode === constants.escCode) {
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
    overlayImage.src = url;
    overlayLikes.textContent = likes;
    overlayComments.textContent = comments.length;
  }

  window.preview = {
    closeButton: closeButton,
    genereteGalleryOverlay: genereteGalleryOverlay,
    openPopup: openPopup,
    closePopup: closePopup
  };
})();
