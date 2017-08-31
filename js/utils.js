'use strict';

window.utils = (function () {
  var VK_ENTER = 13;
  var VK_ESC = 27;

  var getRandomFromRange = function (min, max) {
    return (Math.random() * (max - min) + min);
  };


  var getRandomItem = function (arrOfItems) {
    return arrOfItems[Math.floor(Math.random() * arrOfItems.length)];
  };


  var getRandomList = function (arr) {
    // сначала случайный список полностью совпадает
    // с переданным массивом

    var randomList = arr.slice(0, arr.length);


    // затем мы удаляем из него случайное количество элементов,
    // таким образом, получая случайный список элементов из заданного набора

    var countToRemove = Math.floor(Math.random() * arr.length);

    for (var i = 0; i < countToRemove; i++) {
      randomList.splice(Math.floor(Math.random() * randomList.length), 1);
    }

    return randomList;
  };


  var capitalizeFirstLetter = function (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  };


  var addElementsToHTML = function (elements, container) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < elements.length; i++) {
      fragment.appendChild(elements[i]);
    }

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
    getRandomFromRange: getRandomFromRange,
    getRandomItem: getRandomItem,
    getRandomList: getRandomList,
    capitalizeFirstLetter: capitalizeFirstLetter,
    addElementsToHTML: addElementsToHTML,
    isEscPressed: isEscPressed,
    isEnterPressed: isEnterPressed
  };
})();