'use strict';

window.kbMap = (function () {
  var selectPinAndShowCard = function (pinToSelect) {
    selectedAdIndex = window.kbPin.selectPin(pinElements, selectedAdIndex, pinToSelect);

    if (selectedAdIndex !== -1) {
      window.kbCard.showCard(ads[selectedAdIndex]);

      document.addEventListener('keydown', onDocumentKeyDownWhenCardOpened);
    }
  };


  var onPinElementClick = function (evt) {
    selectPinAndShowCard(evt.currentTarget);
  };


  var onPinElementKeyDown = function (evt) {
    window.utils.isEnterPressed(evt, function () {
      selectPinAndShowCard(evt.currentTarget);
    });
  };


  var hideCardAndUnselectPin = function () {
    window.kbCard.hideCard();

    selectedAdIndex = window.kbPin.unselectPin(pinElements, selectedAdIndex);

    document.removeEventListener('keydown', onDocumentKeyDownWhenCardOpened);
  };


  var onDocumentKeyDownWhenCardOpened = function (evt) {
    window.utils.isEscPressed(evt, function () {
      hideCardAndUnselectPin();
    });
  };


  var onCardCloseClick = function () {
    hideCardAndUnselectPin();
  };


  var AD_COUNT = 8;

  var ads = window.kbData.createAds(AD_COUNT);

  var pinElements = window.kbPin.createPinElements(ads);

  var mainPinElement = document.querySelector('.pin__main');

  var pinMap = document.querySelector('.tokyo__pin-map');

  var selectedAdIndex = -1;

  window.utils.addElementsToHTML(pinElements, pinMap);

  selectPinAndShowCard(pinElements[0]);

  for (var i = 0; i < pinElements.length; i++) {
    pinElements[i].addEventListener('click', onPinElementClick);
    pinElements[i].addEventListener('keydown', onPinElementKeyDown);
  }

  document.querySelector('.dialog__close').addEventListener('click', onCardCloseClick);


  var locationLimits = window.kbData.locationLimits;

  var pinCoordsLimits = {
    min: window.kbPin.getPinCoordsByLocation({x: locationLimits.x.min, y: locationLimits.y.min}),
    max: window.kbPin.getPinCoordsByLocation({x: locationLimits.x.max, y: locationLimits.y.max})
  };


  mainPinElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };


      var newLeft = (mainPinElement.offsetLeft - shift.x);
      newLeft = window.utils.getLimitedValue(newLeft, pinCoordsLimits.min.left, pinCoordsLimits.max.left);

      var newTop = (mainPinElement.offsetTop - shift.y);
      newTop = window.utils.getLimitedValue(newTop, pinCoordsLimits.min.top, pinCoordsLimits.max.top);

      mainPinElement.style.left = newLeft + 'px';
      mainPinElement.style.top = newTop + 'px';


      var newLocation = window.kbPin.getLocationByPinCoords(mainPinElement);

      window.kbForm.setAddress('x: ' + newLocation.x + ', y: ' + newLocation.y);
    };


    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });


  return {};
})();
