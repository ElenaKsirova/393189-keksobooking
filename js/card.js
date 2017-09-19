'use strict';

window.card = (function () {
  var RUBLE_SIGN = '₽';

  var offerDialogElement = document.querySelector('#offer-dialog');
  var dialogElement = document.querySelector('.dialog');
  var templateElement = document.querySelector('#lodge-template');
  var titleImageElement = document.querySelector('.dialog__title').querySelector('img');

  var setField = function (parentElement, fieldName, content) {
    var fieldElement = parentElement.querySelector('.lodge__' + fieldName);

    fieldElement.textContent = content;
  };


  var render = function (ad) {
    var newPanelElement = templateElement.content.cloneNode(true);

    var offer = ad.offer;

    var offerType = window.utils.capitalizeFirstLetter(
        window.data.getOfferTypeCaption(offer.type)
    );

    var featuresDivElement = newPanelElement.querySelector('.lodge__features');


    setField(newPanelElement, 'title', offer.title);
    setField(newPanelElement, 'address', offer.address);
    setField(newPanelElement, 'price', offer.price + RUBLE_SIGN + '/ночь');
    setField(newPanelElement, 'type', offerType);
    setField(newPanelElement, 'rooms-and-guests', 'Для ' + offer.guests + ' гостей в ' + offer.rooms + ' комнатах');

    setField(newPanelElement, 'checkin-time', 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout);


    offer.features.forEach(function (feature) {
      var newSpanElement = document.createElement('span');

      newSpanElement.classList.add('feature__image');
      newSpanElement.classList.add('feature__image--' + feature);

      featuresDivElement.appendChild(newSpanElement);
    });


    setField(newPanelElement, 'description', offer.description);


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


    // querySelector('.dialog__panel') нельзя выносить из render,
    // т.к. dialog__panel при каждом вызове render замещается

    offerDialogElement.replaceChild(fragment, document.querySelector('.dialog__panel'));

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
