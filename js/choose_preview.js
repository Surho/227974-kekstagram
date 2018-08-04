'use strict';
(function () {
  var fileChooser = document.querySelector('#upload-file');
  var preview = document.querySelector('.filter-image-preview');
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var PREVIEW_DEFAULT_WIDTH = 587;
  var PREVIEW_DEFAULT_HEIGHT = PREVIEW_DEFAULT_WIDTH;

  function optimizeSize(picture) {
    var width = parseInt(picture.width, 10);
    var height = parseInt(picture.height, 10);
    if (width > height) {
<<<<<<< HEAD
      var pictureDefaultWidth = 587;
      var widthShift = (width - pictureDefaultWidth) / 2;
=======
      var widthShift = (width - PREVIEW_DEFAULT_WIDTH) / 2;
>>>>>>> c10461666955899234cc04ea74b89b58a8b1204c
      picture.style.transform = 'translateX(-' + widthShift + 'px)';
    }
  }

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    if (!file) {
      return;
    }
    var fileName = file.name.toLowerCase();
    var check = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (check) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        preview.src = reader.result;
        preview.style.height = PREVIEW_DEFAULT_HEIGHT + 'px';
      });
      reader.readAsDataURL(file);
      reader.addEventListener('loadend', function (evt) {
        optimizeSize(preview);
      });
    }
  });
})();
