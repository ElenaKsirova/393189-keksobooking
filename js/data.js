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
    'bungalo'
  ];

  var OFFER_MIN_PRICES = [
    1000,
    10000,
    0
  ];

  var OFFER_TYPE_CAPTIONS = [
    'квартира',
    'домик',
    'бунгало'
  ];


  var getOfferTypeCaption = function (offerType) {
    var offerTypeIndex = OFFER_TYPES.indexOf(offerType);

    return (
      (offerTypeIndex !== -1) ? OFFER_TYPE_CAPTIONS[offerTypeIndex] : offerType
    );
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
    CHECK_IN_TIMES: CHECK_IN_TIMES,
    CHECK_OUT_TIMES: CHECK_OUT_TIMES,
    OFFER_TYPES: OFFER_TYPES,
    OFFER_MIN_PRICES: OFFER_MIN_PRICES,
    getOfferTypeCaption: getOfferTypeCaption
  };
})();
