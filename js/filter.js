'use strict';

window.filter = (function () {
  var filters = document.querySelector('.tokyo__filters');

  var offerTypeFilter = filters.querySelector('#housing_type');
  var offerPriceFilter = filters.querySelector('#housing_price');
  var roomNumberFilter = filters.querySelector('#housing_room-number');
  var guestsNumberFilter = filters.querySelector('#housing_guests-number');

  var featureFilters = filters.querySelectorAll('#housing_features input[name="feature"]');


  var onChange = null;

  var changeHandler = function () {
    if (onChange) {
      window.debounce(onChange);
    }
  };


  offerTypeFilter.addEventListener('change', changeHandler);

  offerPriceFilter.addEventListener('change', changeHandler);

  roomNumberFilter.addEventListener('change', changeHandler);

  guestsNumberFilter.addEventListener('change', changeHandler);

  for (var featureIndex = 0; featureIndex < featureFilters.length; featureIndex++) {
    featureFilters[featureIndex].addEventListener('change', changeHandler);
  }


  var filterOfferType = function (offerType) {
    return ((offerTypeFilter.value === 'any') ? true : (offerTypeFilter.value === offerType));
  };


  var filterOfferPrice = function (offerPrice) {
    switch (offerPriceFilter.value) {
      case 'any':
        return true;

      case 'low':
        return (offerPrice < 10000);

      case 'middle':
        return ((offerPrice >= 10000) && (offerPrice < 50000));

      case 'high':
        return (offerPrice >= 50000);

      default:
        return true;
    }
  };


  var filterRoomNumber = function (roomNumber) {
    return ((roomNumberFilter.value === 'any') ? true : (+(roomNumberFilter.value) === +roomNumber));
  };


  var filterGuestsNumber = function (guestsNumber) {
    return ((guestsNumberFilter.value === 'any') ? true : (+(guestsNumberFilter.value) === +guestsNumber));
  };


  var filterFeatures = function (features) {
    var checkedFeatureFilters = filters.querySelectorAll('#housing_features input[name="feature"]:checked');

    for (var i = 0; i < checkedFeatureFilters.length; i++) {
      if (features.indexOf(checkedFeatureFilters[i].value) === -1) {
        return false;
      }
    }

    return true;
  };


  var setOnChange = function (onChangeToSet) {
    onChange = onChangeToSet;
  };


  var filterAd = function (ad) {
    var offer = ad.offer;

    return (
      filterOfferType(offer.type) &&
      filterOfferPrice(offer.price) &&
      filterRoomNumber(offer.rooms) &&
      filterGuestsNumber(offer.guests) &&
      filterFeatures(offer.features)
    );
  };


  return {
    setOnChange: setOnChange,
    filterAd: filterAd
  };
})();
