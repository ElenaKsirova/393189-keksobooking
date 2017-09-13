'use strict';

window.error = (function () {
  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 10000; margin: 0 auto; padding: 15px; text-align: center; background-color: black; border: 3px solid red; border-radius: 3px;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.style.fontFamily = 'Arial, Tahoma';
    node.style.color = 'red';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  return {
    errorHandler: errorHandler
  };
})();
