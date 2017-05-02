'use strict';
(function () {
  var uploadPreview = document.querySelector('.upload-form-preview');
  var scroller = document.querySelector('.upload-filter-level');
  var handler = document.querySelector('.upload-filter-level-pin');
  var lineVal = document.querySelector('.upload-filter-level-val');
  var activeFilter;

  function setActive(name) {
    activeFilter = name;
    return activeFilter;
  }

  function activate(applyFilter) {
    var filtersInfo = {
      chrome: {
        scale: 1 / 450,
        cssValue: 'grayscale',
        division: ''
      },
      sepia: {
        scale: 1 / 450,
        cssValue: 'sepia',
        division: ''
      },
      marvin: {
        scale: 100 / 450,
        cssValue: 'invert',
        division: '%'
      },
      phobos: {
        scale: 3 / 450,
        cssValue: 'blur',
        division: 'px'
      },
      heat: {
        scale: 3 / 450,
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
    var resizeValue = document.querySelector('.upload-resize-controls-value');
    handler.style.left = 90 + 'px';
    lineVal.style.width = 20 + '%';
    resizeValue.setAttribute('value', 100 + '%');
    uploadPreview.style.transform = 'scale(' + 1 + ')';
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
