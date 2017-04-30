'use strict';
(function () {
  var preview = window.preview;
  var pictures = preview.pictures;
  console.log(pictures);
  
  // pictures.addEventListener('click', function (evt) {
  //   evt.preventDefault();
  //   var target = evt.target;
  //   while (target !== pictures) {
  //     if (target.tagName === 'A') {
  //       var likes = target.querySelector('.picture-likes').textContent;
  //       var url = target.querySelector('img').getAttribute('src');
  //       var comments = target.querySelector('.picture-comments').textContent;
  //       preview.genereteGalleryOverlay(url, likes, comments);
  //       preview.openPopup();
  //     }
  //     target = target.parentNode;
  //   }
  // });

  preview.closeButton.addEventListener('click', function () {
    preview.closePopup();
  });

  preview.closeButton.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      preview.closePopup();
    }
  });
})();
