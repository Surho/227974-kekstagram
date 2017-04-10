'use strict';
window.data = (function () {
  function genereteNumber(min, max) {
    var randomNumber = min + Math.random() * ((max + 1) - min);
    return Math.floor(randomNumber);
  }

  function genereteComment() {
    var COMMENT_1 = 'Лица у людей на фотке перекошены, как-будто их избивают. Как можно было поймать такой неудачный момент?!';
    var COMMENT_2 = 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.';
    var generetedComment = (Math.random() <= 0.5) ? COMMENT_1 : COMMENT_2;
    return generetedComment;
  }

  function generetePhotoUrl(number) {
    var photoUrl = 'photos/' + (number + 1) + '.jpg';
    return photoUrl;
  }

  function generetePhotosObject() {   
    var userPhotosObject = [];     
    for (var i = 0; i < 25; i++) {
      userPhotosObject[i] = {
        url: generetePhotoUrl(i),
        likes: genereteNumber(15, 200),
        comments: genereteComment()
      };
    }
    return userPhotosObject;
  }

  return {
    photosObject: generetePhotosObject(),
    genereteNumber: genereteNumber
  };
})();
