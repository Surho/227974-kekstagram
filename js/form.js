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
  var activeFilter;

  function applyFilter(filter) {
    uploadPreview.classList.remove(activeFilter);
    activeFilter = filter;
    uploadPreview.classList.add(activeFilter);
  }

  uploadFilterControls.addEventListener('click', function (evt) {
    var target = evt.target;
    while (target !== uploadFilterControls) {
      if (target.value === 'none') {
        applyFilter('none');
      }
      if (target.value) {
        applyFilter('filter-' + target.value);
      }
      target = target.parentNode;
    }
  });

  var resizeControls = document.querySelector('.upload-resize-controls');
  var resizeDec = resizeControls.querySelector('.upload-resize-controls-button-dec');
  var resizeInc = resizeControls.querySelector('.upload-resize-controls-button-inc');

  function resize(step, max, bigger) {
    var resizeValue = resizeControls.querySelector('.upload-resize-controls-value');
    var currentValue = parseInt(resizeValue.value, 10);
    function resizeBigger() {
      if (currentValue < max) {
        currentValue += step;
        var scale = 'transform: scale(' + (currentValue / 100) + ')';
        uploadPreview.style = scale;
        resizeValue.setAttribute('value', currentValue + '%');
      }
    }
    function resizeSmaller() {
      if (currentValue > step) {
        currentValue -= step;
        var scale = 'transform: scale(' + (currentValue / 100) + ')';
        uploadPreview.style = scale;
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
    if (myForm.checkValidity()) {
      myForm.reset();
      evt.preventDefault();
      uploadPreview.classList.remove(activeFilter);
      uploadPreview.style = 'transform: scale(1)';
      resizeValue.setAttribute('value', '100%');
    }
  });
})();
