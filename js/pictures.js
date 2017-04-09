'use strict';
;(function (){

  function genereteNumber (min, max){
    var randomNumber = min + Math.random() * ((max + 1) - min);
    return Math.floor(randomNumber);
  }

  function genereteComment (){
    var COMMENT_1 = 'Лица у людей на фотке перекошены, как-будто их избивают. Как можно было поймать такой неудачный момент?!',
        COMMENT_2 = 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
        generetedComment = (Math.random()<=0.5) ? COMMENT_1 : COMMENT_2;
    return generetedComment;
  }

  function generetePhotoUrl (number){
    var photoUrl = 'photos/' + (number + 1) + '.jpg';
    return photoUrl;
  }

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

  var userPhotosObject = generetePhotosObject (); //Если засунуть этот вар в функции, где использую( generetePhotoElement и genereteGalleryOverlay)
                                                //то в них будут генерироваться разные обьекты (если я правильно понимаю), а мне нужен один обьект,
  function generetePhotoElement (){             //поэтому пока вынес за функции. Можно ли сделать как в комментарии в строке 21?
    var fragment=document.createDocumentFragment();
    for (var i = 0; i < userPhotosObject.length; i++) {
    fragment.appendChild(generetePhotosTemplate(userPhotosObject[i]));
    };
    return fragment;
  };

  function createPhotosFlow (){
    var picturesList = document.querySelector('.pictures');
    picturesList.appendChild(generetePhotoElement());
  }

  function genereteGalleryOverlay (url, likes){
    galleryOverlay.querySelector(".gallery-overlay-image").src=url;
    galleryOverlay.querySelector(".likes-count").textContent=likes;
    galleryOverlay.querySelector(".comments-count").textContent=genereteNumber(0, 25);
  }

  createPhotosFlow ();




  var pictures=document.querySelector('.pictures');
  var galleryOverlay=document.querySelector('.gallery-overlay');
  var closeButton=galleryOverlay.querySelector('.gallery-overlay-close');

  function onPopupEscPress(evt) {
    if(evt.keyCode === 27) {
      closePopup();
      }
  }

  function openPopup() {
    galleryOverlay.classList.remove("invisible");
    document.addEventListener('keydown', onPopupEscPress);
  }

  function closePopup() {
    galleryOverlay.classList.add('invisible');
    document.removeEventListener('keydown', onPopupEscPress);
  }

  pictures.addEventListener('click', function(evt) {
    evt.preventDefault();
    var target=evt.target;
    while(target!=pictures) {
      if(target.tagName==='A') {
          var likes=target.querySelector('.picture-likes').textContent,
              url=target.querySelector('img').getAttribute('src');
          genereteGalleryOverlay(url, likes);
          openPopup();
      }
    target=target.parentNode;
    }
  });

  closeButton.addEventListener('click', function() {
    closePopup();
  })

  closeButton.addEventListener('keydown', function(evt){
    if(evt.keyCode === 13) {
      openPopup();
    }
  })



  var uploadForm=document.querySelector('.upload-form'),
      uploadOverlay = document.querySelector('.upload-overlay'),
      uploadCancel = uploadOverlay.querySelector('.upload-form-cancel');

  function onUploadEscPress(evt) {
      if(evt.keyCode === 27) {
        hideUploadOverlay();
      }
  }

  function onUploadEnterPress(evt) {
    if(evt.keyCode === 13) {
        hideUploadOverlay();
      }
  }

  function showUploadForm() {
    uploadForm.classList.remove('invisible');
  }

  function hideUplaodForm() {
    uploadForm.classList.add('invisible');
  }

  function showUploadOverlay (){
    uploadOverlay.classList.remove("invisible");
    uploadCancel.addEventListener("keydown", onUploadEnterPress);
    document.addEventListener("keydown", onUploadEscPress);
  }

  function hideUploadOverlay (){
    uploadOverlay.classList.add("invisible");
    uploadCancel.removeEventListener("keydown", onUploadEnterPress);
    document.removeEventListener("keydown", onUploadEscPress);
  }

  function uploadFormCancel() {
    uploadCancel.addEventListener('click', function() {
      hideUploadOverlay();
      showUploadForm();
    })
  }

  showUploadForm();
  hideUploadOverlay ();

  uploadForm.addEventListener("click", function(evt) {
    evt.preventDefault();
    showUploadOverlay();
    uploadFormCancel();
  })

  document.querySelector('.upload-form-description').addEventListener ('keydown', function(evt) {
    if(evt.keyCode === 27) {
      evt.stopPropagation();
    }
  })



})();
