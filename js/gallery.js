'use strict';
(function () {
  var preview = window.preview;

  preview.closeButton.addEventListener('click', function () {
    preview.closePopup();
  });

  preview.closeButton.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      preview.closePopup();
    }
  });
})();
