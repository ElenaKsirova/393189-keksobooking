'use strict';

window.map = (function () {
  window.backend.load(
    function (ads) {
      var pinElements = window.pin.createPinElements(ads);

      var mainPinElement = document.querySelector('.pin__main');

      var pinMap = document.querySelector('.tokyo__pin-map');

      window.utils.addElementsToHTML(pinElements, pinMap);

      window.showCard(ads, pinElements);

      var locationLimits = window.data.locationLimits;

      var pinCoordsLimits = {
        min: window.pin.getPinCoordsByLocation({x: locationLimits.x.min, y: locationLimits.y.min}),
        max: window.pin.getPinCoordsByLocation({x: locationLimits.x.max, y: locationLimits.y.max})
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


          var newLocation = window.pin.getLocationByPinCoords(mainPinElement);

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
    window.error.errorHandler
  );

  return {};
})();
