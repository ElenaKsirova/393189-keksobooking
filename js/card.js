'use strict';

window.card = (function () {
  var renderCard = function (ad) {
    var templateSelector = '#lodge-template';
    var destPanelSelector = '.dialog__panel';
    var titleSelector = '.dialog__title';

    var RUBLE_SIGN = '&#x20bd;';

    var newPanelElement = document.querySelector(templateSelector).content.cloneNode(true);

    var setField = function (field, content) {
      var fieldElement = newPanelElement.querySelector('.lodge__' + field);

      fieldElement.textContent = content;

      return fieldElement;
    };


    var destPanelElement = document.querySelector(destPanelSelector);

    var offer = ad.offer;

    var offerType = window.utils.capitalizeFirstLetter(
        window.data.getOfferTypeCaption(offer.type)
    );

    var featuresDivElement = newPanelElement.querySelector('.lodge__features');


    setField('title', offer.title);
    setField('address', offer.address);

    var offerPriceElement = setField('price', offer.price);
    offerPriceElement.innerHTML = offerPriceElement.innerHTML + RUBLE_SIGN + '/ночь';

    setField('type', offerType);
    setField('rooms-and-guests', 'Для ' + offer.guests + ' гостей в ' + offer.rooms + ' комнатах');

    setField('checkin-time', 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout);


    for (var i = 0; i < offer.features.length; i++) {
      var newSpanElement = document.createElement('span');

      newSpanElement.classList.add('feature__image');
      newSpanElement.classList.add('feature__image--' + offer.features[i]);

      featuresDivElement.appendChild(newSpanElement);
    }


    setField('description', offer.description);


    var fragment = document.createDocumentFragment();

    fragment.appendChild(newPanelElement);

    destPanelElement.parentNode.replaceChild(fragment, destPanelElement);


    document.querySelector(titleSelector).querySelector('img').src = ad.author.avatar;
  };


  var showCard = function (ad) {
    renderCard(ad);

    document.querySelector('.dialog').classList.remove('hidden');
  };


  var hideCard = function () {
    document.querySelector('.dialog').classList.add('hidden');
  };


  return {
    showCard: showCard,
    hideCard: hideCard
  };
})();
