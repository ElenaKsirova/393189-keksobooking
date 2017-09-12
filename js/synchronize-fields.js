'use strict';

window.synchronizeFields = function (elementA, elementB, valuesA, valuesB, syncValuesFunc, isTwoWay) {
  elementB.addEventListener('change', function () {
    var valueIndex = valuesB.indexOf(elementB.value);

    if (valueIndex >= 0) {
      syncValuesFunc(elementA, valuesA[valueIndex]);
    }
  });

  isTwoWay = (isTwoWay) ? isTwoWay : true;

  if (isTwoWay) {
    elementA.addEventListener('change', function () {
      var valueIndex = valuesA.indexOf(elementA.value);

      if (valueIndex >= 0) {
        syncValuesFunc(elementB, valuesB[valueIndex]);
      }
    });
  }
};

