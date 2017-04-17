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

  initializeFilters.hideScroller();

  function applyFilter(filterObject) {
    var filterPinPosition = initializeFilters.filterHandler.offsetLeft;
    uploadPreview.style.filter = filterObject.cssValue + '(' + (filterPinPosition * filterObject.scale) + filterObject.division + ')';
  }

  uploadFilterControls.addEventListener('click', function (evt) {
    var target = evt.target;
    while (target !== uploadFilterControls) {
      if (target.value === 'none') {
        uploadPreview.style = '';
        initializeFilters.hideScroller();
        initializeFilters.resetAllSettings();
      } else if (target.value) {
        initializeFilters.showScroller();
        initializeFilters.resetAllSettings();
        initializeFilters.activateFilter(target.value, applyFilter);
      }
      target = target.parentNode;
    }
  });

  var scaleElement = document.querySelector('.upload-resize-controls');

  var adjustScale = function (currentValue) {
    uploadPreview.style.transform = 'scale(' + currentValue / 100 + ')';
  };
  initializeScale(scaleElement, adjustScale);

  var submitButton = document.querySelector('.upload-form-submit');

  function resetValidForm() {
    var myForm = uploadOverlay.querySelector('#upload-filter');
    myForm.reset();
    initializeFilters.resetAllSettings();
    initializeFilters.hideScroller();
  }

  function highlightErrorForm() {
    var myForm = uploadOverlay.querySelector('#upload-filter');
    var myFormTextarea = myForm.querySelector('.upload-form-description');
    myFormTextarea.style = 'outline-color: red';
    myFormTextarea.onblur = function () {
      myFormTextarea.style = '';
    };
  }

  submitButton.addEventListener('click', function (evt) {
    var myForm = uploadOverlay.querySelector('#upload-filter');
    if (myForm.checkValidity()) {
      resetValidForm();
      evt.preventDefault();
    } else {
      highlightErrorForm();
    }
  });
  
  initializeFilters.filterHandler.addEventListener('mousedown', function (evt) {
    var filterHandler = initializeFilters.filterHandler;
    evt.preventDefault();

    var startCords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function mouseMove(moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCords.x - moveEvt.clientX,
        y: startCords.y - moveEvt.clientY
      };
      
      startCords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
  
      if (filterHandler.offsetLeft <= 0) {
        filterHandler.style.left = filterHandler.offsetLeft + 1 + 'px';
        return;
      }
      if (filterHandler.offsetLeft >= 450) {
        filterHandler.style.left = filterHandler.offsetLeft - 1 + 'px';
        return;
      }

      initializeFilters.filterHandler.style.left = (filterHandler.offsetLeft - shift.x) + 'px';
      initializeFilters.filterLineVal.style.width = (filterHandler.offsetLeft * (100 / 450)) + '%';
      initializeFilters.activateFilter(initializeFilters.activeFilter, applyFilter);
      }
  
    function mouseUp(upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseup', mouseUp);
    } 
    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
  });
})();
