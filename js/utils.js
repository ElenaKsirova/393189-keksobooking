'use strict';

window.utils = (function () {
  var VK_ENTER = 13;
  var VK_ESC = 27;

  var DEBOUNCE_INTERVAL = 500; // ms

  var lastTimeout;

  var debounce = function (fun) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }

    lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
  };


  var getLimitedValue = function (value, min, max) {
    if (value < min) {
      return min;
    } else if (value > max) {
      return max;
    }

    return value;
  };


  var capitalizeFirstLetter = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };


  var addElementsToHTML = function (elements, container) {
    var fragment = document.createDocumentFragment();

    elements.forEach(function (element) {
      fragment.appendChild(element);
    });

    container.appendChild(fragment);
  };


  var isEscPressed = function (evt, onPress) {
    if (evt.keyCode === VK_ESC) {
      onPress();
    }
  };


  var isEnterPressed = function (evt, onPress) {
    if (evt.keyCode === VK_ENTER) {
      onPress();
    }
  };


  return {
    debounce: debounce,
    getLimitedValue: getLimitedValue,
    capitalizeFirstLetter: capitalizeFirstLetter,
    addElementsToHTML: addElementsToHTML,
    isEscPressed: isEscPressed,
    isEnterPressed: isEnterPressed
  };
})();
