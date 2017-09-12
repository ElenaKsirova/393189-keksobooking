'use strict';

window.kbForm = (function () {
  function syncValues(element, value) {
    element.value = value;
  }

  function syncValueWithMin(element, value) {
    element.min = value;
    element.placeholder = value;
  }


  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  window.synchronizeFields(
      timeIn, timeOut, window.kbData.checkInTimes, window.kbData.checkOutTimes, syncValues
  );


  var offerType = document.querySelector('#type');
  var offerPrice = document.querySelector('#price');

  window.synchronizeFields(
      offerPrice, offerType, window.kbData.offerMinPrices, window.kbData.offerTypes, syncValueWithMin,
      false /* sync one way */
  );


  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  window.synchronizeFields(
      capacity, roomNumber, window.kbData.offerCapacity, window.kbData.offerRoomNumbers, syncValues
  );


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
