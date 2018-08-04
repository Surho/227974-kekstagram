'use strict';
(function () {
  window.initializeScale = function (scaleElement, adjustScale) {
    var resizeControls = scaleElement;
    var resizeDec = resizeControls.querySelector('.upload-resize-controls-button-dec');
    var resizeInc = resizeControls.querySelector('.upload-resize-controls-button-inc');
    var resizeValue = resizeControls.querySelector('.upload-resize-controls-value');
    var ZOOM_STEP = 25;
    var MAX_ZOOM = 100;

    function resize(bigger) {
      var currentValue = parseInt(resizeValue.value, 10);
      if (bigger && currentValue < MAX_ZOOM) {
        currentValue += ZOOM_STEP;
      }
      if (!bigger && currentValue > ZOOM_STEP) {
        currentValue -= ZOOM_STEP;
      }
      adjustScale(currentValue);
      resizeValue.setAttribute('value', currentValue + '%');
    }

    scaleElement.addEventListener('click', function (evt) {
      evt.preventDefault();
      var target = evt.target;
      if (target === resizeDec) {
<<<<<<< HEAD
        resize();
=======
        resize(false);
>>>>>>> c10461666955899234cc04ea74b89b58a8b1204c
      }
      if (target === resizeInc) {
        resize(true);
      }
      target = target.parentNode;
    });
  };
})();

