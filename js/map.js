'use strict';

window.map = (function () {
  var NUMBER_OF_PINS_TO_SHOW_FIRST = 3;

  window.backend.load(
      function (ads) {
        var pinElements = window.pin.createElements(ads);


        var mainPinElement = document.querySelector('.pin__main');
        var mainPinStartCoords = {left: mainPinElement.style.left, top: mainPinElement.style.top};

        var mainPinStartLocation = window.pin.getLocationByCoords(mainPinElement);

        window.form.setAddress('x: ' + mainPinStartLocation.x + ', y: ' + mainPinStartLocation.y);


        var pinMapElement = document.querySelector('.tokyo__pin-map');

        window.utils.addElementsToHTML(pinElements, pinMapElement);

        window.showCard(ads, pinElements);


        window.pin.setupFilters();


        var numberOfPins = NUMBER_OF_PINS_TO_SHOW_FIRST;

        window.pin.filterPins(
            ads, pinElements,
            function () {
              return (numberOfPins-- > 0);
            }
        );

        window.pin.setOnFilterChange(function () {
          window.pin.filterPins(ads, pinElements, window.pin.filterAds);
        });


        window.form.setOnReset(function () {
          mainPinElement.style.left = mainPinStartCoords.left;
          mainPinElement.style.top = mainPinStartCoords.top;

          window.form.setAddress('x: ' + mainPinStartLocation.x + ', y: ' + mainPinStartLocation.y);
        });


        var locationLimits = window.data.locationLimits;

        var pinCoordsLimits = {
          min: window.pin.getCoordsByLocation({x: locationLimits.x.min, y: locationLimits.y.min}),
          max: window.pin.getCoordsByLocation({x: locationLimits.x.max, y: locationLimits.y.max})
        };


        mainPinElement.addEventListener('mousedown', function (evt) {
          evt.preventDefault();

          var startCoords = {
            x: evt.clientX,
            y: evt.clientY
          };

          var onMouseMove = function (moveEvt) {
            moveEvt.preventDefault();

            var shift = {
              x: startCoords.x - moveEvt.clientX,
              y: startCoords.y - moveEvt.clientY
            };

            startCoords = {
              x: moveEvt.clientX,
              y: moveEvt.clientY
            };


            var newLeft = (mainPinElement.offsetLeft - shift.x);
            newLeft = window.utils.getLimitedValue(newLeft, pinCoordsLimits.min.left, pinCoordsLimits.max.left);

            var newTop = (mainPinElement.offsetTop - shift.y);
            newTop = window.utils.getLimitedValue(newTop, pinCoordsLimits.min.top, pinCoordsLimits.max.top);

            mainPinElement.style.left = newLeft + 'px';
            mainPinElement.style.top = newTop + 'px';


            var newLocation = window.pin.getLocationByCoords(mainPinElement);

            window.form.setAddress('x: ' + newLocation.x + ', y: ' + newLocation.y);
          };


          var onMouseUp = function (upEvt) {
            upEvt.preventDefault();

            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
          };

          document.addEventListener('mousemove', onMouseMove);
          document.addEventListener('mouseup', onMouseUp);
        });
      },

      function (errorMessage) {
        var divElement = document.createElement('div');

        divElement.classList.add('loading-ads-error-msg');

        divElement.textContent = errorMessage;
        document.body.insertAdjacentElement('afterbegin', divElement);
      }
  );

  return {};
})();
