'use strict';

(function () {
  window.showCard = function (ads, pinElements) {
    var selectedAdIndex = -1;

    var selectPinAndShowCard = function (pinToSelect) {
      selectedAdIndex = window.pin.select(pinElements, selectedAdIndex, pinToSelect);

      if (selectedAdIndex !== -1) {
        window.card.show(ads[selectedAdIndex]);

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


    var onPinElementHide = function (evt) {
      if (selectedAdIndex !== -1) {
        if (evt.currentTarget === pinElements[selectedAdIndex]) {
          hideCardAndUnselectPin();
        }
      }
    };


    var hideCardAndUnselectPin = function () {
      window.card.hide();

      selectedAdIndex = window.pin.unselect(pinElements, selectedAdIndex);

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


    if (ads && ads.length) {
      selectPinAndShowCard(pinElements[0]);
    }

    pinElements.forEach(function (pinElement) {
      pinElement.addEventListener('click', onPinElementClick);
      pinElement.addEventListener('keydown', onPinElementKeyDown);
      pinElement.addEventListener('hide', onPinElementHide);
    });

    document.querySelector('.dialog__close').addEventListener('click', onCardCloseClick);
  };
})();
