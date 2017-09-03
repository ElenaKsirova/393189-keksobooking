'use strict';

window.kbPin = (function () {
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 40;

  // createPinElement:
  //   <div class="pin" style="left: {{location.x}}px; top: {{location.y}}px">
  //     <img src="{{author.avatar}}" class="rounded" width="40" height="40">
  //   </div>

  var createPinElement = function (ad) {
    var newDiv = document.createElement('div');

    var pinCoords = getPinCoordsByLocation(ad.location);

    newDiv.className = 'pin';
    newDiv.style.left = pinCoords.left + 'px';
    newDiv.style.top = pinCoords.top + 'px';
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


  var getLocationByPinCoords = function (pinElement) {
    return {
      x: +((pinElement.style.left).replace('px', '')) + (PIN_WIDTH / 2),
      y: +((pinElement.style.top).replace('px', '')) + PIN_HEIGHT
    };
  };


  var getPinCoordsByLocation = function (location) {
    return {
      left: location.x - (PIN_WIDTH / 2),
      top: location.y - PIN_HEIGHT
    };
  };


  return {
    createPinElements: createPinElements,
    selectPin: selectPin,
    unselectPin: unselectPin,
    getLocationByPinCoords: getLocationByPinCoords,
    getPinCoordsByLocation: getPinCoordsByLocation
  };
})();
