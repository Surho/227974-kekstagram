'use strict';
(function () {
  var preview = window.preview;
  var constants = window.constants;

  preview.closeButton.addEventListener('click', function () {
    preview.closePopup();
  });

  preview.closeButton.addEventListener('keydown', function (evt) {
    if (evt.keyCode === constants.enterCode) {
      preview.closePopup();
    }
  });
})();
