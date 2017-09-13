'use strict';

window.card = (function () {
  var renderCard = function (ad) {
    var templateSelector = '#lodge-template';
    var destPanelSelector = '.dialog__panel';
    var titleSelector = '.dialog__title';

    var RUBLE_SIGN = '&#x20bd;';

    var newPanel = document.querySelector(templateSelector).content.cloneNode(true);

    var setField = function (field, content) {
      newPanel.querySelector('.lodge__' + field).innerHTML = content;
    };


    var destPanel = document.querySelector(destPanelSelector);

    var offer = ad.offer;

    var offerType = window.utils.capitalizeFirstLetter(
        window.data.getOfferTypeCaption(offer.type)
    );

    var featuresDiv = newPanel.querySelector('.lodge__features');


    setField('title', offer.title);
    setField('address', offer.address);
    setField('price', offer.price + RUBLE_SIGN + '/ночь');
    setField('type', offerType);
    setField('rooms-and-guests', 'Для ' + offer.guests + ' гостей в ' + offer.rooms + ' комнатах');

    setField('checkin-time', 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout);


    for (var i = 0; i < offer.features.length; i++) {
      var newSpan = document.createElement('span');

      newSpan.classList.add('feature__image');
      newSpan.classList.add('feature__image--' + offer.features[i]);

      featuresDiv.appendChild(newSpan);
    }


    setField('description', offer.description);


    var fragment = document.createDocumentFragment();

    fragment.appendChild(newPanel);

    destPanel.parentNode.replaceChild(fragment, destPanel);


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
