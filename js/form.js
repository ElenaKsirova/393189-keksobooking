'use strict';

window.form = (function () {
  var syncValues = function (element, value) {
    element.value = value;
  };

  var syncValueWithMin = function (element, value) {
    element.min = value;
    element.placeholder = value;
  };


  var timeInElement = document.querySelector('#timein');
  var timeOutElement = document.querySelector('#timeout');

  var data = window.data;

  window.synchronizeFields(
      timeInElement, timeOutElement, data.checkInTimes, data.checkOutTimes, syncValues
  );


  var offerTypeElement = document.querySelector('#type');
  var offerPriceElement = document.querySelector('#price');

  window.synchronizeFields(
      offerPriceElement, offerTypeElement, data.offerMinPrices, data.offerTypes, syncValueWithMin,
      false /* sync one way */
  );


  var roomNumberElement = document.querySelector('#room_number');
  var capacityElement = document.querySelector('#capacity');

  roomNumberElement.addEventListener('change', function () {
    switch (roomNumberElement.value) {
      case '1':
        capacityElement.value = '1';
        break;

      case '2':
        if ((capacityElement.value !== '1') && (capacityElement.value !== '2')) {
          capacityElement.value = '2';
        }
        break;

      case '3':
        if ((capacityElement.value !== '1') && (capacityElement.value !== '2') && (capacityElement.value !== '3')) {
          capacityElement.value = '3';
        }
        break;

      case '100':
        capacityElement.value = '0';
        break;
    }
  });


  capacityElement.addEventListener('change', function () {
    switch (capacityElement.value) {
      case '0':
        roomNumberElement.value = '100';
        break;

      case '1':
        if (roomNumberElement.value === '100') {
          roomNumberElement.value = '1';
        }
        break;

      case '2':
        if ((roomNumberElement.value !== '2') && (roomNumberElement.value !== '3')) {
          roomNumberElement.value = '2';
        }
        break;

      case '3':
        if (roomNumberElement.value !== '3') {
          roomNumberElement.value = '3';
        }
        break;
    }
  });


  var addressElement = document.querySelector('#address');

  var setAddress = function (newAddress) {
    addressElement.value = newAddress;
  };


  var onReset = null;

  var setOnReset = function (onResetToSet) {
    onReset = onResetToSet;
  };


  var formElement = document.querySelector('.notice__form');

  formElement.addEventListener('submit', function (evt) {
    var successHandler = function () {
      formElement.reset();

      if (onReset) {
        onReset();
      }
    };

    var errorHandler = function (errorMessage) {
      var adTitleElement = document.querySelector('.notice__header');

      var divElement = document.createElement('div');

      divElement.style = 'z-index: 10000; margin: 0 auto; width: 960px; box-sizing: border-box; padding: 33px; text-align: center; background-color: white; border: 2px dashed red; border-radius: 2px;';
      divElement.style.position = 'absolute';
      divElement.style.left = 0;
      divElement.style.right = 0;
      divElement.style.fontSize = '16px';
      divElement.style.fontFamily = 'Arial, Tahoma';
      divElement.style.color = 'red';

      divElement.textContent = 'Сервер не принял форму. ' + errorMessage + '. Нажмите, чтобы закрыть сообщение';

      adTitleElement.insertAdjacentElement('afterbegin', divElement);

      divElement.addEventListener('click', function (divElementEvt) {
        divElementEvt.currentTarget.remove();
      });
    };

    evt.preventDefault();

    window.backend.save(new FormData(formElement), successHandler, errorHandler);
  });


  return {
    setAddress: setAddress,
    setOnReset: setOnReset
  };
})();
