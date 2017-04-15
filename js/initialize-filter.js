'use strict';
window['initializeFilters'] =  (function() {
  
    var uploadPreview = document.querySelector('.upload-form-preview');
    var filterScroller = document.querySelector('.upload-filter-level');
    var filterHandler = document.querySelector('.upload-filter-level-pin');
    var filterLineVal = document.querySelector('.upload-filter-level-val');
    var filterLine = document.querySelector('.upload-filter-level-line');

    function activate(filterName, applyFilter) {
    var filtersInfo = {
      chrome: {
        scale: 1/450,
        cssValue: 'grayscale' ,
        division: ''
      },
      sepia: {
        scale: 1/450,
        cssValue:'sepia',
        division: ''
      },
      marvin: {
        scale: 100/450,
        cssValue:'invert',
        division: '%'
      },
      phobos: {
        scale: 3/450,
        cssValue:'blur',
        division: 'px'
      },
      heat: {
        scale: 3/450,
        cssValue: 'brightness',
        division: ''
      }
    }

    var filterObject = filtersInfo[filterName];
    initializeFilters.activeFilter = filterName;
    applyFilter(filterObject);
  }

  function hideScroller() {
    filterScroller.style.display = 'none';
  };

  function showScroller() {
    filterScroller.style.display = '';
  };

  function resetAllSettings() {
    var resizeValue = document.querySelector('.upload-resize-controls-value');
    initializeFilters.filterHandler.style.left = 90 + 'px';
    initializeFilters.filterLineVal.style.width =  20 +'%';
    resizeValue.setAttribute('value', 100 + '%');
    uploadPreview.style.transform = 'scale(' + 1 + ')';
    uploadPreview.style = '';
  };

  return {
    activateFilter: activate,
    resetAllSettings: resetAllSettings,
    hideScroller: hideScroller,
    showScroller: showScroller,
    filterScroller: filterScroller,
    filterHandler: filterHandler,
    filterLineVal: filterLineVal,
    filterLine: filterLine
  };
})();