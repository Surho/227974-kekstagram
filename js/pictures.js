'use strict';
;(function (){

  function genereteNumber (min, max){
    var randomNumber = min + Math.random() * ((max + 1) - min);
    return Math.floor(randomNumber);
  };

  function genereteComment (){
    var COMMENT_1 = 'Лица у людей на фотке перекошены, как-будто их избивают. Как можно было поймать такой неудачный момент?!',
        COMMENT_2 = 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
        generetedComment = (Math.random()<=0.5) ? COMMENT_1 : COMMENT_2;
    return generetedComment;
  };

  function generetePhotoUrl (number){
    var photoUrl = 'photos/' + (number + 1) + '.jpg';
    return photoUrl;
  };

  function generetePhotosObject (){       //Чтобы сразу затем работать с обьектом и сразу его сгенерировать ,
    var userPhotosObject = [];            //можно ли написать в виде var userPhotosObject = (function (){.......})();   ?
    for(var i = 0; i < 25; i++) {
      userPhotosObject[i] = {
      url: generetePhotoUrl (i),
      likes: genereteNumber (15,200),
      comments: genereteComment ()
      }
    }
    return userPhotosObject;
  };

  function generetePhotosTemplate(photo) {
    var templatePhoto = document.querySelector('#picture-template').content,
        photoTemplate = templatePhoto.cloneNode(true);
    photoTemplate.querySelector('img').src = photo.url;
    photoTemplate.querySelector('.picture-comments').textContent = photo.comments;
    photoTemplate.querySelector('.picture-likes').textContent = photo.likes;
    return photoTemplate;
  };

  var userPhotosObject = generetePhotosObject (); 
                                                
  function generetePhotoElement (){             
    var fragment=document.createDocumentFragment();
    for (var i = 0; i < userPhotosObject.length; i++) {
    fragment.appendChild(generetePhotosTemplate(userPhotosObject[i]));
    };
    return fragment;
  };

  function createPhotosFlow (){
    var picturesList = document.querySelector('.pictures');
    picturesList.appendChild(generetePhotoElement());
  };

  function genereteGalleryOverlay (url, likes){
    galleryOverlay.querySelector(".gallery-overlay-image").src=url;
    galleryOverlay.querySelector(".likes-count").textContent=likes;
    galleryOverlay.querySelector(".comments-count").textContent=genereteNumber(0, 25);
  };

  createPhotosFlow ();

//module4-task1

  var pictures=document.querySelector('.pictures');
  var galleryOverlay=document.querySelector('.gallery-overlay');
  var closeButton=galleryOverlay.querySelector('.gallery-overlay-close');

  function onPopupEscPress(evtPress) {
    if(evtPress.keyCode === 27) {
      closePopup();
      }
  };

  function openPopup (){
    galleryOverlay.classList.remove("invisible");
    document.addEventListener('keydown', onPopupEscPress);
  };

  function closePopup (){
    galleryOverlay.classList.add('invisible');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  pictures.addEventListener ('click', function(evt){
    evt.preventDefault ();
    var target=evt.target;
    while(target!=pictures) {
      if(target.tagName ==='A') {
          var likes=target.querySelector('.picture-likes').textContent,
              url=target.querySelector('img').getAttribute('src');
          genereteGalleryOverlay (url, likes);
          openPopup ();
      }
    target = target.parentNode;
    }
  });

  closeButton.addEventListener('click', function (){
    closePopup ();
  });

  closeButton.addEventListener('keydown', function (evt){
    if(evt.keyCode === 13) {
      closePopup ();
    }
  });

  var uploadForm = document.querySelector('.upload-form'),
      uploadOverlay = document.querySelector('.upload-overlay'),
      uploadCancel = uploadOverlay.querySelector('.upload-form-cancel');

  function onUploadEscPress (evt){
    if(evt.keyCode === 27){
      hideUploadOverlay ();
    }
  };

  function onUploadEnterPress (evt){
    if(evt.keyCode === 13) {
      hideUploadOverlay ();
    }
  };

  function showUploadForm (){
    uploadForm.classList.remove('invisible');
  };

  function hideUplaodForm (){
    uploadForm.classList.add('invisible');
  };

  function showUploadOverlay (){
    uploadOverlay.classList.remove("invisible");
    uploadCancel.addEventListener("keydown", onUploadEnterPress);
    document.addEventListener("keydown", onUploadEscPress);
  };

  function hideUploadOverlay (){
    uploadOverlay.classList.add("invisible");
    uploadCancel.removeEventListener("keydown", onUploadEnterPress);
    document.removeEventListener("keydown", onUploadEscPress);
  };

  showUploadForm ();
  hideUploadOverlay ();

  uploadForm.addEventListener('click', function (evt){
    evt.preventDefault ();
    showUploadOverlay ();
  });

  uploadCancel.addEventListener('click', function (evt){
    evt.preventDefault ();
    hideUploadOverlay ();
  });

  document.querySelector('.upload-form-description').addEventListener ('keydown', function(evt) {
    if(evt.keyCode === 27) {
      evt.stopPropagation();
    }
  });

  //module4-task2

  var uploadFilterControls = document.querySelector('.upload-filter-controls'),
      uploadPreview = document.querySelector('.upload-form-preview');
  var activeFilter;

  function applyFilter (filter){
    uploadPreview.classList.remove(activeFilter);
    activeFilter=filter;
    uploadPreview.classList.add(activeFilter);
  }    

  uploadFilterControls.addEventListener('click', function (evt){
    var target = evt.target;
    while(target != uploadFilterControls) {
      if(target.value === 'none') {
        applyFilter('none');
      }
      if(target.value) {
        applyFilter('filter-' + target.value)
      }
    target=target.parentNode;
    }
  })

  var resizeControls=document.querySelector('.upload-resize-controls'),
      resizeDec=resizeControls.querySelector('.upload-resize-controls-button-dec'),
      resizeInc=resizeControls.querySelector('.upload-resize-controls-button-inc');

  function resize (step, max, bigger){
      var resizeValue = resizeControls.querySelector('.upload-resize-controls-value'),
          currentValue = parseInt(resizeValue.value);
      function resizeBigger (){
        if(currentValue < max) {
          currentValue += step;
          var scale = "transform: scale(" + (currentValue / 100) + ')';
          uploadPreview.style = scale;
          resizeValue.setAttribute('value', currentValue + "%");
        }
      };
      function resizeSmaller (){
        if(currentValue > step) {
          currentValue -= step;
          var scale = "transform: scale(" + (currentValue / 100) + ')';
          uploadPreview.style = scale;
          resizeValue.setAttribute('value', currentValue + "%");
        }
      };
      bigger ?  resizeBigger() : resizeSmaller();
  };    

  resizeDec.addEventListener('click', function (evt){
    resize(25, 100);
  });

  resizeInc.addEventListener('click', function (evt){
    resize(25, 100, true);
  });

  var submitButton = document.querySelector('.upload-form-submit'),
      commentField = document.querySelector('.upload-form-description');

  submitButton.addEventListener('click', function (evt){
    var resizeValue=resizeControls.querySelector('.upload-resize-controls-value'),
        myForm = uploadOverlay.querySelector('#upload-filter');
    if (myForm.checkValidity()) {
    myForm.reset();
    evt.preventDefault();
    uploadPreview.classList.remove(activeFilter);
    uploadPreview.style='transform: scale(1)';
    resizeValue.setAttribute('value', '100%');
    myForm.reset();
    };
  })

})();
