'use strict';

window.kbPin = (function () {
  // createPinElement:
  //   <div class="pin" style="left: {{location.x}}px; top: {{location.y}}px">
  //     <img src="{{author.avatar}}" class="rounded" width="40" height="40">
  //   </div>

  var createPinElement = function (ad) {
    var PIN_WIDTH = 40;
    var PIN_HEIGHT = 40;

    var newDiv = document.createElement('div');

    var left = ad.location.x - (PIN_WIDTH / 2);
    var top = ad.location.y - PIN_HEIGHT;

    newDiv.className = 'pin';
    newDiv.style = 'left: ' + left + 'px; top: ' + top + 'px';
    newDiv.tabIndex = 0;


    var newImg = document.createElement('img');

    newImg.src = ad.author.avatar;
    newImg.className = 'rounded';
    newImg.width = 40;
    newImg.height = 40;

    newDiv.appendChild(newImg);

    return newDiv;
  };


  var createPinElements = function (ads) {
    var elements = [];

    for (var i = 0; i < ads.length; i++) {
      elements[i] = createPinElement(ads[i]);
    }

    return elements;
  };


  var selectPin = function (pinElements, selectedPinIndex, pinElementToSelect) {
    var selectedPinElement = (selectedPinIndex !== -1) ? pinElements[selectedPinIndex] : null;

    if (selectedPinElement !== pinElementToSelect) {
      if (selectedPinElement) {
        selectedPinElement.classList.remove('pin--active');
      }

      selectedPinElement = pinElementToSelect;

      selectedPinElement.classList.add('pin--active');
    }

    return (pinElements.indexOf(selectedPinElement));
  };


  var unselectPin = function (pinElements, selectedPinIndex) {
    var selectedPinElement = (selectedPinIndex !== -1) ? pinElements[selectedPinIndex] : null;

    if (selectedPinElement) {
      selectedPinElement.classList.remove('pin--active');

      selectedPinIndex = -1;
    }

    return selectedPinIndex;
  };


  return {
    createPinElements: createPinElements,
    selectPin: selectPin,
    unselectPin: unselectPin
  };
})();
