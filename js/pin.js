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


  // createPinElement:
  //   <div class="pin" style="left: {{location.x}}px; top: {{location.y}}px">
  //     <img src="{{author.avatar}}" class="rounded" width="40" height="40">
  //   </div>

  var createPinElement = function (ad) {
    var divElement = document.createElement('div');

    var pinCoords = getPinCoordsByLocation(ad.location);

    divElement.className = 'pin';
    divElement.style.left = pinCoords.left + 'px';
    divElement.style.top = pinCoords.top + 'px';
    divElement.tabIndex = 0;


    var imgElement = document.createElement('img');

    imgElement.src = ad.author.avatar;
    imgElement.className = 'rounded';
    imgElement.width = 40;
    imgElement.height = 40;

    divElement.appendChild(imgElement);

    return divElement;
  };


  var createPinElements = function (ads) {
    var elements = [];

    for (var i = 0; i < ads.length; i++) {
      elements[i] = createPinElement(ads[i]);
    }

    return elements;
  };


  var selectPin = function (pinElements, selectedPinIndex, pinElementToSelect) {
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


  var unselectPin = function (pinElements, selectedPinIndex) {
    var selectedPinElement = (selectedPinIndex !== -1) ? pinElements[selectedPinIndex] : null;

    if (selectedPinElement) {
      selectedPinElement.classList.remove('pin--active');

      selectedPinIndex = -1;
    }

    return selectedPinIndex;
  };


  var showPin = function (pinElement) {
    pinElement.classList.remove('hidden');
  };


  var hidePin = function (pinElement) {
    pinElement.classList.add('hidden');

    var hideEvent = new Event('hide');

    pinElement.dispatchEvent(hideEvent);
  };


  var filterPins = function (ads, pinElements, filterFunction) {
    for (var i = 0; i < pinElements.length; i++) {
      if (filterFunction(ads[i])) {
        showPin(pinElements[i]);
      } else {
        hidePin(pinElements[i]);
      }
    }
  };


  var getLocationByPinCoords = function (pinElement) {
    return {
      x: +((pinElement.style.left).replace('px', '')) + (PIN_WIDTH / 2),
      y: +((pinElement.style.top).replace('px', '')) + PIN_HEIGHT
    };
  };


  var getPinCoordsByLocation = function (location) {
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
    var checkedFeatureFilterElements =
      filterContainerElement.querySelectorAll('#housing_features input[name="feature"]:checked');

    for (var i = 0; i < checkedFeatureFilterElements.length; i++) {
      if (features.indexOf(checkedFeatureFilterElements[i].value) === -1) {
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


  var filterChangeHandler = function () {
    if (onFilterChange) {
      window.utils.debounce(onFilterChange);
    }
  };


  var setupFilters = function () {
    offerTypeFilterElement.addEventListener('change', filterChangeHandler);

    offerPriceFilterElement.addEventListener('change', filterChangeHandler);

    roomNumberFilterElement.addEventListener('change', filterChangeHandler);

    guestsNumberFilterElement.addEventListener('change', filterChangeHandler);

    for (var i = 0; i < featureFilterElements.length; i++) {
      featureFilterElements[i].addEventListener('change', filterChangeHandler);
    }
  };


  return {
    createPinElements: createPinElements,
    selectPin: selectPin,
    unselectPin: unselectPin,
    getLocationByPinCoords: getLocationByPinCoords,
    getPinCoordsByLocation: getPinCoordsByLocation,
    setOnFilterChange: setOnFilterChange,
    setupFilters: setupFilters,
    filterPins: filterPins,
    filterAds: filterAds
  };
})();
