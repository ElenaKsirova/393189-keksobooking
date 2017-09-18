'use strict';

window.card = (function () {
  var RUBLE_SIGN = '₽';

  var dialogElement = document.querySelector('.dialog');
  var templateElement = document.querySelector('#lodge-template');
  var titleImageElement = document.querySelector('.dialog__title').querySelector('img');

  var render = function (ad) {
    // след. селектор нельзя выносить за пределы фунции, иначе ниже parentNode будет равен null
    var destPanelElement = document.querySelector('.dialog__panel');

    var newPanelElement = templateElement.content.cloneNode(true);

    var setField = function (field, content) {
      // след. селектор можно вынести за пределы функции, но функция setField для конкретного поля
      // используется всегда ровно 1 раз, делать же оптимизацию, вынося селектор за пределы render нельзя,
      // т.к. newPanelElement каждый раз новый - см. cloneNode выше
      var fieldElement = newPanelElement.querySelector('.lodge__' + field);

      fieldElement.textContent = content;
    };


    var offer = ad.offer;

    var offerType = window.utils.capitalizeFirstLetter(
        window.data.getOfferTypeCaption(offer.type)
    );

    var featuresDivElement = newPanelElement.querySelector('.lodge__features');


    setField('title', offer.title);
    setField('address', offer.address);
    setField('price', offer.price + RUBLE_SIGN + '/ночь');
    setField('type', offerType);
    setField('rooms-and-guests', 'Для ' + offer.guests + ' гостей в ' + offer.rooms + ' комнатах');

    setField('checkin-time', 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout);


    offer.features.forEach(function (feature) {
      var newSpanElement = document.createElement('span');

      newSpanElement.classList.add('feature__image');
      newSpanElement.classList.add('feature__image--' + feature);

      featuresDivElement.appendChild(newSpanElement);
    });


    setField('description', offer.description);


    var lodgePhotosDivElement = newPanelElement.querySelector('.lodge__photos');

    offer.photos.forEach(function (photo) {
      var newImageElement = document.createElement('img');

      newImageElement.src = photo;
      newImageElement.width = 52;
      newImageElement.height = 42;
      newImageElement.alt = 'Lodge photo';

      lodgePhotosDivElement.appendChild(newImageElement);
    });


    var fragment = document.createDocumentFragment();

    fragment.appendChild(newPanelElement);

    destPanelElement.parentNode.replaceChild(fragment, destPanelElement);


    titleImageElement.src = ad.author.avatar;
  };


  var show = function (ad) {
    render(ad);

    dialogElement.classList.remove('hidden');
  };


  var hide = function () {
    dialogElement.classList.add('hidden');
  };


  return {
    show: show,
    hide: hide
  };
})();
