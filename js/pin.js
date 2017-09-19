'use strict';

window.pin = (function () {
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 40;

  var onFilterChange = null;

  var filterContainerElement = document.querySelector('.tokyo__filters');

  var offerTypeFilterElement = filterContainerElement.querySelector('#housing_type');
  var offerPriceFilterElement = filterContainerElement.querySelector('#housing_price');
  var roomNumberFilterElement = filterContainerElement.querySelector('#housing_room-number');
  var guestsNumberFilterElement = filterContainerElement.querySelector('#housing_guests-number');

  var featureFilterElements = filterContainerElement.querySelectorAll('#housing_features input[name="feature"]');


  var createElement = function (ad) {
    var divElement = document.createElement('div');

    var coords = getCoordsByLocation(ad.location);

    divElement.className = 'pin';
    divElement.style.left = coords.left + 'px';
    divElement.style.top = coords.top + 'px';
    divElement.tabIndex = 0;


    var imgElement = document.createElement('img');

    imgElement.src = ad.author.avatar;
    imgElement.className = 'rounded';
    imgElement.width = 40;
    imgElement.height = 40;

    divElement.appendChild(imgElement);

    return divElement;
  };


  var createElements = function (ads) {
    return ads.map(function (ad) {
      return createElement(ad);
    });
  };


  var select = function (pinElements, selectedPinIndex, pinElementToSelect) {
    var selectedPinElement = (selectedPinIndex !== -1) ? pinElements[selectedPinIndex] : null;

    if (selectedPinElement !== pinElementToSelect) {
      if (selectedPinElement) {
        selectedPinElement.classList.remove('pin--active');
      }

      selectedPinElement = pinElementToSelect;

      selectedPinElement.classList.add('pin--active');
    }

    return (pinElements.indexOf(selectedPinElement));
  };


  var unselect = function (pinElements, selectedPinIndex) {
    var selectedPinElement = (selectedPinIndex !== -1) ? pinElements[selectedPinIndex] : null;

    if (selectedPinElement) {
      selectedPinElement.classList.remove('pin--active');

      selectedPinIndex = -1;
    }

    return selectedPinIndex;
  };


  var show = function (pinElement) {
    pinElement.classList.remove('hidden');
  };


  var hide = function (pinElement) {
    pinElement.classList.add('hidden');

    var hideEvent = new Event('hide');

    pinElement.dispatchEvent(hideEvent);
  };


  var filterPins = function (ads, pinElements, filterFunction) {
    pinElements.forEach(function (pinElement, index) {
      if (filterFunction(ads[index])) {
        show(pinElement);
      } else {
        hide(pinElement);
      }
    });
  };


  var getLocationByCoords = function (pinElement) {
    return {
      x: +((pinElement.style.left).replace('px', '')) + (PIN_WIDTH / 2),
      y: +((pinElement.style.top).replace('px', '')) + PIN_HEIGHT
    };
  };


  var getCoordsByLocation = function (location) {
    return {
      left: location.x - (PIN_WIDTH / 2),
      top: location.y - PIN_HEIGHT
    };
  };


  var filterOfferType = function (offerType) {
    return ((offerTypeFilterElement.value === 'any') ? true : (offerTypeFilterElement.value === offerType));
  };


  var filterOfferPrice = function (offerPrice) {
    switch (offerPriceFilterElement.value) {
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
    return (
      (roomNumberFilterElement.value === 'any')
        ? true
        : (+(roomNumberFilterElement.value) === +roomNumber)
    );
  };


  var filterGuestsNumber = function (guestsNumber) {
    return (
      (guestsNumberFilterElement.value === 'any')
        ? true
        : (+(guestsNumberFilterElement.value) === +guestsNumber)
    );
  };


  var filterFeatures = function (features) {
    for (var i = 0; i < featureFilterElements.length; i++) {
      if (featureFilterElements[i].checked && (features.indexOf(featureFilterElements[i].value) === -1)) {
        return false;
      }
    }

    return true;
  };


  var setOnFilterChange = function (onFilterChangeToSet) {
    onFilterChange = onFilterChangeToSet;
  };


  var filterAds = function (ad) {
    var offer = ad.offer;

    return (
      filterOfferType(offer.type) &&
      filterOfferPrice(offer.price) &&
      filterRoomNumber(offer.rooms) &&
      filterGuestsNumber(offer.guests) &&
      filterFeatures(offer.features)
    );
  };


  var onFilterChangeWrapped = function () {
    if (onFilterChange) {
      window.utils.debounce(onFilterChange);
    }
  };


  var setupFilters = function () {
    offerTypeFilterElement.addEventListener('change', onFilterChangeWrapped);

    offerPriceFilterElement.addEventListener('change', onFilterChangeWrapped);

    roomNumberFilterElement.addEventListener('change', onFilterChangeWrapped);

    guestsNumberFilterElement.addEventListener('change', onFilterChangeWrapped);

    featureFilterElements.forEach(function (featureFilterElement) {
      featureFilterElement.addEventListener('change', onFilterChangeWrapped);
    });
  };


  return {
    createElements: createElements,
    select: select,
    unselect: unselect,
    getLocationByCoords: getLocationByCoords,
    getCoordsByLocation: getCoordsByLocation,
    setOnFilterChange: setOnFilterChange,
    setupFilters: setupFilters,
    filterPins: filterPins,
    filterAds: filterAds
  };
})();
