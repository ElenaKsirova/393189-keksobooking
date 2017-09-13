'use strict';

window.form = (function () {
  function syncValues(element, value) {
    element.value = value;
  }

  function syncValueWithMin(element, value) {
    element.min = value;
    element.placeholder = value;
  }


  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  var data = window.data;

  window.synchronizeFields(
      timeIn, timeOut, data.checkInTimes, data.checkOutTimes, syncValues
  );


  var offerType = document.querySelector('#type');
  var offerPrice = document.querySelector('#price');

  window.synchronizeFields(
      offerPrice, offerType, data.offerMinPrices, data.offerTypes, syncValueWithMin,
      false /* sync one way */
  );


  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  window.synchronizeFields(
      capacity, roomNumber, data.offerCapacity, data.offerRoomNumbers, syncValues
  );


  var address = document.querySelector('#address');

  var setAddress = function (newAddress) {
    address.value = newAddress;
  };


  var form = document.querySelector('.notice__form');

  form.addEventListener('submit', function (evt) {
    var successHandler = function () {
      form.reset();
    };

    evt.preventDefault();

    window.backend.save(new FormData(form), successHandler, window.error.errorHandler);
  });


  return {
    setAddress: setAddress
  };
})();
