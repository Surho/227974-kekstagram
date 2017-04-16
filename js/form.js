'use strict';
;(function () {
  var uploadForm = document.querySelector('.upload-form');
  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadCancel = uploadOverlay.querySelector('.upload-form-cancel');

  function onUploadEscPress(evt) {
    if (evt.keyCode === 27) {
      hideUploadOverlay();
    }
  }

  function onUploadEnterPress(evt) {
    if (evt.keyCode === 13) {
      hideUploadOverlay();
    }
  }

  function showUploadForm() {
    uploadForm.classList.remove('invisible');
  }

  function hideUplaodForm() {
    uploadForm.classList.add('invisible');
  }

  function showUploadOverlay() {
    uploadOverlay.classList.remove('invisible');
    uploadCancel.addEventListener('keydown', onUploadEnterPress);
    document.addEventListener('keydown', onUploadEscPress);
  }

  function hideUploadOverlay() {
    uploadOverlay.classList.add('invisible');
    uploadCancel.removeEventListener('keydown', onUploadEnterPress);
    document.removeEventListener('keydown', onUploadEscPress);
  }

  showUploadForm();
  hideUploadOverlay();

  uploadForm.addEventListener('click', function (evt) {
    evt.preventDefault();
    showUploadOverlay();
  });

  uploadCancel.addEventListener('click', function (evt) {
    evt.preventDefault();
    hideUploadOverlay();
  });

  document.querySelector('.upload-form-description').addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      evt.stopPropagation();
    }
  });

  

  var uploadFilterControls = document.querySelector('.upload-filter-controls');
  var uploadPreview = document.querySelector('.upload-form-preview');
  var filterScroller = document.querySelector('.upload-filter-level');
  var activeFilter;
  var filterHandler = document.querySelector('.upload-filter-level-pin');
  var filterLineVal = document.querySelector('.upload-filter-level-val');
  var filterLine = document.querySelector('.upload-filter-level-line');

  var filterInfo = {
    defaultPinPosition: 90 + 'px',
    defailtLinePosition: 20 + '%',
    chrome: {
      scale: (1/450),
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

  function hideScroller() {
    filterScroller.style.display = 'none';
  };
  hideScroller();

  function activateFilter(filter) {
    var filterPinPosition = filterHandler.offsetLeft;
    var filterObject = filterInfo[filter];
    uploadPreview.style.filter = filterObject.cssValue + '(' + (filterPinPosition * filterObject.scale) + filterObject.division + ')';
  }

  uploadFilterControls.addEventListener('click', function (evt) {
    var target = evt.target;
    while (target !== uploadFilterControls) {
      if (target.value === 'none') {
        activeFilter = 'none';
        uploadPreview.style = '';
        hideScroller();
        resetAllSettings();
      } else if (target.value) {
        activeFilter = target.value;
        filterScroller.style.display = '';
        resetAllSettings();
        activateFilter(activeFilter);
      }
      target = target.parentNode;
    }
  });

  function resetAllSettings() {
    filterHandler.style.left = 90 + 'px';
    filterLineVal.style.width =  20 +'%';
    resizeValue.setAttribute('value', 100 + '%');
    uploadPreview.style.transform = 'scale(' + 1 + ')';
  }

  var resizeControls = document.querySelector('.upload-resize-controls');
  var resizeDec = resizeControls.querySelector('.upload-resize-controls-button-dec');
  var resizeInc = resizeControls.querySelector('.upload-resize-controls-button-inc');
  var resizeValue = resizeControls.querySelector('.upload-resize-controls-value');

  function resize(step, max, bigger) {
    var currentValue = parseInt(resizeValue.value, 10);
    function resizeBigger() {
      if (currentValue < max) {
        currentValue += step;
        var scale = 'scale(' + (currentValue / 100) + ')';
        uploadPreview.style.transform = scale;
        resizeValue.setAttribute('value', currentValue + '%');
      }
    }
    function resizeSmaller() {
      if (currentValue > step) {
        currentValue -= step;
        var scale = 'scale(' + (currentValue / 100) + ')';
        uploadPreview.style.transform = scale;
        resizeValue.setAttribute('value', currentValue + '%');
      }
    }
    (bigger) ? resizeBigger() : resizeSmaller();
  }

  resizeDec.addEventListener('click', function (evt) {
    resize(25, 100);
  });

  resizeInc.addEventListener('click', function (evt) {
    resize(25, 100, true);
  });

  var submitButton = document.querySelector('.upload-form-submit');

  submitButton.addEventListener('click', function (evt) {
    var resizeValue = resizeControls.querySelector('.upload-resize-controls-value');
    var myForm = uploadOverlay.querySelector('#upload-filter');
    var myFormTextarea = myForm.querySelector('.upload-form-description');
    if (myForm.checkValidity()) {
      myForm.reset();
      evt.preventDefault();
      uploadPreview.classList.remove(activeFilter);
      uploadPreview.style = 'transform: scale(1)';
      resizeValue.setAttribute('value', '100%');
    } else {
      myFormTextarea.style = 'outline-color: red';
      myFormTextarea.onblur= function () { 
        myFormTextarea.style = '';
      }
    }
  });
  
  filterHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCords = {
      x: evt.clientX,
      y: evt.clientY
    } 

    function mouseMove(moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCords.x - moveEvt.clientX,
        y: startCords.y - moveEvt.clientY
      }
      
      startCords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      }
  
      if (filterHandler.offsetLeft <= 0) {
        filterHandler.style.left = filterHandler.offsetLeft + 1 + 'px';
        return;
      } 
      if (filterHandler.offsetLeft >= 450) {
        filterHandler.style.left = filterHandler.offsetLeft - 1 + 'px';
        return;
      }
      filterHandler.style.left = (filterHandler.offsetLeft - shift.x) + 'px';
      filterLineVal.style.width = (filterHandler.offsetLeft*filterInfo.marvin.scale) +'%';
      
      if (!activeFilter || activeFilter === 'none') {
        return;
      }
      activateFilter(activeFilter);
      };
  
    function mouseUp(upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseup', mouseUp);
    } 
    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
  });
})();
