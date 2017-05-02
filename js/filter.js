'use strict';
(function () {
  var uploadPreview = document.querySelector('.upload-form-preview');
  var scroller = document.querySelector('.upload-filter-level');
  var handler = document.querySelector('.upload-filter-level-pin');
  var lineVal = document.querySelector('.upload-filter-level-val');
  var resizeValue = document.querySelector('.upload-resize-controls-value');
  var constants = window.constants;
  var activeFilter;

  function setActive(name) {
    activeFilter = name;
    return activeFilter;
  }

  function activate(applyFilter) {
    var filtersInfo = {
      chrome: {
        scale: constants.maxChromeValue / constants.scrollerLineWidth,
        cssValue: 'grayscale',
        division: ''
      },
      sepia: {
        scale: constants.maxSepiaValue / constants.scrollerLineWidth,
        cssValue: 'sepia',
        division: ''
      },
      marvin: {
        scale: constants.maxMarvinValue / constants.scrollerLineWidth,
        cssValue: 'invert',
        division: '%'
      },
      phobos: {
        scale: constants.maxPhobosValue / constants.scrollerLineWidth,
        cssValue: 'blur',
        division: 'px'
      },
      heat: {
        scale: constants.maxHeatValue / constants.scrollerLineWidth,
        cssValue: 'brightness',
        division: ''
      }
    };

    var filterObject = filtersInfo[activeFilter];
    applyFilter(filterObject);
  }

  function hideScroller() {
    scroller.style.display = 'none';
  }

  function showScroller() {
    scroller.style.display = '';
  }

  function resetAllSettings() {
    handler.style.left = constants.handlerDefaultPosition;
    lineVal.style.width = constants.lineValDefaultPosition;
    resizeValue.setAttribute('value', constants.resizeDefaultValue);
    uploadPreview.style.transform = constants.previewDefaultScale;
    uploadPreview.style.cssText = '';
  }

  window.filter = {
    activate: activate,
    resetAllSettings: resetAllSettings,
    hideScroller: hideScroller,
    showScroller: showScroller,
    handler: handler,
    lineVal: lineVal,
    setActive: setActive
  };
})();
