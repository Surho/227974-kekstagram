'use strict';
(function () {
  var uploadForm = document.querySelector('.upload-form');
  var uploadFile = uploadForm.querySelector('#upload-file');
  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadCancel = uploadOverlay.querySelector('.upload-form-cancel');
  var uploadPreview = document.querySelector('.upload-form-preview');
  var filter = window.filter;
  var constants = window.constants;
  var initializeScale = window.initializeScale;

  function onUploadEscPress(evt) {
    if (evt.keyCode === 27) {
      hideUploadOverlay();
      showUploadForm();
    }
  }

  function onUploadEnterPress(evt) {
    if (evt.keyCode === 13) {
      hideUploadOverlay();
      showUploadForm();
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

  uploadFile.addEventListener('change', function (evt) {
    showUploadOverlay();
    hideUplaodForm();
  });

  uploadCancel.addEventListener('click', function (evt) {
    evt.preventDefault();
    hideUploadOverlay();
    showUploadForm();
  });

  document.querySelector('.upload-form-description').addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      evt.stopPropagation();
    }
  });

  var uploadFilterControls = document.querySelector('.upload-filter-controls');

  filter.hideScroller();

  function applyFilter(filterObject) {
    var filterPinPosition = filter.handler.offsetLeft;
    uploadPreview.style.filter = filterObject.cssValue + '(' + (filterPinPosition * filterObject.scale) + filterObject.division + ')';
  }

  uploadFilterControls.addEventListener('click', function (evt) {
    var target = evt.target;
    while (target !== uploadFilterControls) {
      if (target.value === 'none') {
        uploadPreview.style = '';
        filter.setActive(target.value);
        filter.hideScroller();
        filter.resetAllSettings();
        return;
      }
      if (target.value) {
        filter.setActive(target.value);
        filter.showScroller();
        filter.resetAllSettings();
        filter.activate(applyFilter);
      }
      target = target.parentNode;
    }
  });

  var scaleElement = document.querySelector('.upload-resize-controls');

  function adjustScale(currentValue) {
    uploadPreview.style.transform = 'scale(' + currentValue / 100 + ')';
  }
  initializeScale(scaleElement, adjustScale);

  var submitButton = document.querySelector('.upload-form-submit');

  function resetValidForm() {
    var myForm = uploadOverlay.querySelector('#upload-filter');
    myForm.reset();
    filter.resetAllSettings();
    filter.hideScroller();
  }

  function highlightErrorForm() {
    var myForm = uploadOverlay.querySelector('#upload-filter');
    var myFormTextarea = myForm.querySelector('.upload-form-description');
    myFormTextarea.style = 'outline-color: red';
    myFormTextarea.addEventListener('blur', function (evt) {
      myFormTextarea.style = '';
    });
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

  filter.handler.addEventListener('mousedown', function (evt) {
    var handler = filter.handler;
    evt.preventDefault();

    var startCords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();
      var handlerPosition = handler.offsetLeft;
      var clientX = moveEvt.clientX;
      var clientY = moveEvt.clientY;

      var shift = {
        x: startCords.x - clientX,
        y: startCords.y - clientY
      };

      startCords = {
        x: clientX,
        y: clientY
      };

      if (handlerPosition <= 0) {
        handler.style.left = ++handlerPosition + 'px';
        return;
      }
      if (handlerPosition >= constants.scrollerLineWidth) {
        handler.style.left = --handlerPosition + 'px';
        return;
      }

      filter.handler.style.left = (handlerPosition - shift.x) + 'px';
      filter.lineVal.style.width = (handlerPosition * (constants.moveStep)) + '%';
      filter.activate(applyFilter);
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
