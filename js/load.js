'use strict';
(function () {
  window.load = function (url, onLoad, onError) {
    var interval = 10000;
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;
        case 400:
          error = xhr.status + ' : Неправильный запрос';
          break;
        case 401:
          error = xhr.status + ' : Пользователь не авторизован';
          break;
        case 404:
          error = xhr.status + ' : Ничего не найдено';
          break;
        default:
          error = 'Неизвестный статус:' + xhr.status + ' ' + xhr.statusText;
      }
      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения,<br> статус запроса: ' + xhr.status + xhr.statusText);
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = interval;
    xhr.open('GET', url);
    xhr.send();
  };
})();
