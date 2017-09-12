'use strict';

window.showCard = function (ads, pinElements) {
  var selectedAdIndex = -1;

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


  selectPinAndShowCard(pinElements[0]);

  for (var i = 0; i < pinElements.length; i++) {
    pinElements[i].addEventListener('click', onPinElementClick);
    pinElements[i].addEventListener('keydown', onPinElementKeyDown);
  }

  document.querySelector('.dialog__close').addEventListener('click', onCardCloseClick);
};
