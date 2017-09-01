'use strict';

window.kbForm = (function () {
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  timeIn.addEventListener('change', function () {
    timeOut.value = timeIn.value;
  });

  timeOut.addEventListener('change', function () {
    timeIn.value = timeOut.value;
  });


  var offerType = document.querySelector('#type');
  var offerPrice = document.querySelector('#price');

  offerType.addEventListener('change', function () {
    switch (offerType.value) {
      case 'bungalo':
        offerPrice.min = 0;
        break;

      case 'flat':
        offerPrice.min = 1000;
        break;

      case 'house':
        offerPrice.min = 5000;
        break;

      case 'palace':
        offerPrice.min = 10000;
        break;
    }

    offerPrice.placeholder = offerPrice.min;
  });


  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  roomNumber.addEventListener('change', function () {
    switch (roomNumber.value) {
      case '1':
        capacity.value = '1';
        break;

      case '2':
        if ((capacity.value !== '1') && (capacity.value !== '2')) {
          capacity.value = '2';
        }
        break;

      case '3':
        if ((capacity.value !== '1') && (capacity.value !== '2') && (capacity.value !== '3')) {
          capacity.value = '3';
        }
        break;

      case '100':
        capacity.value = '0';
        break;
    }
  });

  capacity.addEventListener('change', function () {
    switch (capacity.value) {
      case '0':
        roomNumber.value = '100';
        break;

      case '1':
        if (roomNumber.value === '100') {
          roomNumber.value = '1';
        }
        break;

      case '2':
        if ((roomNumber.value !== '2') && (roomNumber.value !== '3')) {
          roomNumber.value = '2';
        }
        break;

      case '3':
        if (roomNumber.value !== '3') {
          roomNumber.value = '3';
        }
        break;
    }
  });


  var address = document.querySelector('#address');

  var setAddress = function (newAddress) {
    address.value = newAddress;
  };


  var form = document.querySelector('.notice__form');
  var formSubmit = document.querySelector('.form__submit');

  formSubmit.addEventListener('submit', function () {
    form.reset();
  });


  return {
    setAddress: setAddress
  };
})();
