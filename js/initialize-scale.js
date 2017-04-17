'use strict';
window.initializeScale = function (scaleElement, adjustScale) {

  var resizeControls = scaleElement;
  var resizeDec = resizeControls.querySelector('.upload-resize-controls-button-dec');
  var resizeInc = resizeControls.querySelector('.upload-resize-controls-button-inc');
  var resizeValue = resizeControls.querySelector('.upload-resize-controls-value');

  function resize(step, max, bigger) {
    var currentValue = parseInt(resizeValue.value, 10);
    function resizeBigger() {
      if (currentValue < max) {
        currentValue += step;
        adjustScale(currentValue);
        resizeValue.setAttribute('value', currentValue + '%');
      }
    }
    function resizeSmaller() {
      if (currentValue > step) {
        currentValue -= step;
        adjustScale(currentValue);
        resizeValue.setAttribute('value', currentValue + '%');
      }
    }
    if (bigger) {
      resizeBigger()
    } else {
      resizeSmaller(); 
    } 
  }

  scaleElement.addEventListener('click', function (evt) {
    evt.preventDefault();
    var target = evt.target;
    if (target === resizeDec) {
      resize(25, 100);
    }
    if (target === resizeInc) {
      resize(25, 100, true);
    }
    target = target.parentNode;
  });
};
