'use strict';

window.data = (function () {
  var LOCATION_X_MIN = 300;
  var LOCATION_X_MAX = 900;

  var LOCATION_Y_MIN = 100;
  var LOCATION_Y_MAX = 500;

  var CHECK_IN_TIMES = ['12:00', '13:00', '14:00'];
  var CHECK_OUT_TIMES = ['12:00', '13:00', '14:00'];

  var OFFER_TYPES = [
    'flat',
    'house',
    'bungalo',
    'palace'
  ];

  var OFFER_MIN_PRICES = [
    1000,
    5000,
    0,
    10000
  ];

  var OFFER_TYPE_CAPTIONS = [
    'квартира',
    'домик',
    'бунгало',
    'дворец',
  ];

  var OFFER_ROOM_NUMBERS = [
    '1', '2', '3', '100'
  ];

  var OFFER_CAPACITY = [
    '1', '2', '3', '0'
  ];


  var getOfferTypeCaption = function (offerType) {
    var offerTypeIndex = OFFER_TYPES.indexOf(offerType);

    return (
      (offerTypeIndex !== -1) ? OFFER_TYPE_CAPTIONS[offerTypeIndex] : offerType
    );
  };


  var loadAds = function () {
    var newAds = [];

    var successHandler = function (ads) {
      newAds = newAds.concat(ads);
    };

    window.backend.load(successHandler, window.error.errorHandler);

    return newAds;
  };


  return {
    locationLimits: {
      x: {
        min: LOCATION_X_MIN,
        max: LOCATION_X_MAX
      },
      y: {
        min: LOCATION_Y_MIN,
        max: LOCATION_Y_MAX
      }
    },
    checkInTimes: CHECK_IN_TIMES,
    checkOutTimes: CHECK_OUT_TIMES,
    offerTypes: OFFER_TYPES,
    offerMinPrices: OFFER_MIN_PRICES,
    offerRoomNumbers: OFFER_ROOM_NUMBERS,
    offerCapacity: OFFER_CAPACITY,
    getOfferTypeCaption: getOfferTypeCaption,
    loadAds: loadAds
  };
})();
