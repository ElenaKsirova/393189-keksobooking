'use strict';

// в задании тип "дворец" не был указан, хотя слово "дворец"
// встречается в описаниях - ошибка в задании?

var OFFER_CAPTIONS_TO_TYPES = [
  ['квартира', 'flat'],
  ['домик', 'house'],
  ['бунгало', 'bungalo'],
  ['дворец', 'palace']
];


var OFFER_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];


function getRandomFromRange(min, max) {
  return (Math.random() * (max - min) + min);
}


function getRandomItem(arrOfItems) {
  return arrOfItems[Math.floor(Math.random() * arrOfItems.length)];
}


function getRandomList(arr) {
  // сначала случайный список полностью совпадает
  // с переданным массивом

  var randomList = arr.slice(0, arr.length);


  // затем мы удаляем из него случайное количество элементов,
  // таким образом, получая случайный список элементов из заданного набора

  var countToRemove = Math.floor(Math.random() * arr.length);

  for (var i = 0; i < countToRemove; i++) {
    randomList.splice(Math.floor(Math.random() * randomList.length), 1);
  }

  return randomList;
}


function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


var getOfferTypeByTitle = function (offerTitle) {
  offerTitle = offerTitle.toLowerCase();

  for (var i = 0; i < OFFER_CAPTIONS_TO_TYPES.length; i++) {
    if (offerTitle.indexOf(OFFER_CAPTIONS_TO_TYPES[i][0]) !== -1) {
      return OFFER_CAPTIONS_TO_TYPES[i][1];
    }
  }

  return 'house'; // если тип определить нельзя, возвращаем house
};


var getOfferTypeCaption = function (offerType) {
  for (var i = 0; i < OFFER_CAPTIONS_TO_TYPES.length; i++) {
    if (offerType === OFFER_CAPTIONS_TO_TYPES[i][1]) {
      return OFFER_CAPTIONS_TO_TYPES[i][0];
    }
  }

  return offerType;
};


var generateUserNumStrings = function (userCount) {
  var numStrings = [];

  for (var i = 0; i < userCount; i++) {
    numStrings[i] = ((i > 9) ? '' : '0') + (i + 1);
  }

  return numStrings;
};


// каждый вызов extractRandomUserNumString извлекает выбранный элемент
// из numStrings, таким образом гарантируя уникальность
// выбранного номера пользователя
//
// функция названа extract (а не get) намеренно, чтобы подчеркнуть,
// что передаваемый ей массив numStrings модифицируется

var extractRandomUserNumString = function (numStrings) {
  if (!numStrings.length) {
    return '';
  }

  var numStringIndex = Math.floor(Math.random() * numStrings.length);

  var numString = numStrings[numStringIndex];

  numStrings.splice(numStringIndex, 1);

  return numString;
};


// каждый вызов getRandomOfferTitle извлекает из offerTitles
// один случайный элемент, поэтому offerTitles не константа

var offerTitles = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var getRandomOfferTitle = function () {
  if (!offerTitles.length) {
    return '';
  }

  var titleIndex = Math.floor(Math.random() * offerTitles.length);

  var title = offerTitles[titleIndex];

  offerTitles.splice(titleIndex, 1);

  return title;
};


// цена за аренду - случайное число, но я сделала так,
// чтобы это случайное число выглядело более реалистично;
// например, вряд ли при цене в несколько сот тысяч рублей кто-то
// будет указывать стоимость с точностью до рубля
//
// для диапазона от 1000 до 10000 цены образуются с точностью до 100 рублей
// от 10000 до 100000 — с шагом 200 рублей
// от 100000 до 1 млн — с шагом 1000 рублей

var getRandomOfferPrice = function () {
  var tooPrecisePrice = Math.round(getRandomFromRange(1000, 1000000));
  var roundedPrice = tooPrecisePrice;

  if (tooPrecisePrice < 10000) {
    roundedPrice = Math.floor(tooPrecisePrice / 100) * 100;
  } else if ((tooPrecisePrice > 10000) && (tooPrecisePrice < 100000)) {
    roundedPrice = Math.floor(tooPrecisePrice / 200) * 200;
  } else { // (100000 < tooPrecisePrice)
    roundedPrice = Math.floor(tooPrecisePrice / 1000) * 1000;
  }

  return roundedPrice;
};


// то же самое с гостями: случайное число гостей зависит от типа жилья,
// и количества комнат. Тип жилья определяет максимальное количество гостей
// на 1 комнату, из которого выбирается случайное значение, и уже оно умножается
// на число комнат

var getRandomOfferGuests = function (offerType, offerRooms) {
  var maxGuestsPerRoom = 4;

  if (offerType === 'flat') {
    maxGuestsPerRoom = 5;
  } else if (offerType === 'house') {
    maxGuestsPerRoom = 10;
  } else if (offerType === 'bungalo') {
    maxGuestsPerRoom = 20;
  } else if (offerType === 'palace') {
    maxGuestsPerRoom = 50;
  }

  return Math.round(getRandomFromRange(1, maxGuestsPerRoom)) * offerRooms;
};


function createAds(adCount) {
  var newAds = [];

  var userCount = adCount;

  var userNumStrings = generateUserNumStrings(userCount);


  for (var i = 0; i < adCount; i++) {
    var offerTitle = getRandomOfferTitle();

    var offerType = getOfferTypeByTitle(offerTitle);

    var offerRooms = Math.round(getRandomFromRange(1, 5));

    var locationX = Math.round(getRandomFromRange(300, 900));
    var locationY = Math.round(getRandomFromRange(100, 500));

    newAds[i] = {
      'author': {
        'avatar': 'img/avatars/user' + extractRandomUserNumString(userNumStrings) + '.png'
      },

      'offer': {
        'title': offerTitle,
        'address': locationX + ',' + locationY,
        'price': getRandomOfferPrice(),
        'type': offerType,
        'rooms': offerRooms,
        'guests': getRandomOfferGuests(offerType, offerRooms),
        'checkin': getRandomItem(['12:00', '13:00', '14:00']),
        'checkout': getRandomItem(['12:00', '13:00', '14:00']),
        'features': getRandomList(OFFER_FEATURES),
        'description': '',
        'photos': ''
      },

      'location': {'x': locationX, 'y': locationY}
    };
  }

  return newAds;
}


function addElementsToHTML(elements, container) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < elements.length; i++) {
    fragment.appendChild(elements[i]);
  }

  container.appendChild(fragment);
}


//
// createPinElement
//
// Создает следующий элемент:
//   <div class="pin" style="left: {{location.x}}px; top: {{location.y}}px">
//     <img src="{{author.avatar}}" class="rounded" width="40" height="40">
//   </div>
//

var createPinElement = function (ad) {
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 40;

  var newDiv = document.createElement('div');

  var left = ad.location.x - (PIN_WIDTH / 2);
  var top = ad.location.y - PIN_HEIGHT;

  newDiv.className = 'pin';
  newDiv.style = 'left: ' + left + 'px; top: ' + top + 'px';


  var newImg = document.createElement('img');

  newImg.src = ad.author.avatar;
  newImg.className = 'rounded';
  newImg.width = 40;
  newImg.height = 40;

  newDiv.appendChild(newImg);

  return newDiv;
};


var createPinElements = function (ads) {
  var elements = [];

  for (var i = 0; i < ads.length; i++) {
    elements[i] = createPinElement(ads[i]);
  }

  return elements;
};


var renderDialogPanel = function (ad, templateSelector, destPanelSelector, titleSelector) {
  var RUBLE_SIGN = '&#x20bd;';

  var newPanel = document.querySelector(templateSelector).content.cloneNode(true);

  var setField = function (field, content) {
    newPanel.querySelector('.lodge__' + field).innerHTML = content;
  };


  var destPanel = document.querySelector(destPanelSelector);

  var offer = ad.offer;


  var featuresDiv = newPanel.querySelector('.lodge__features');


  setField('title', offer.title);
  setField('address', offer.address);
  setField('price', offer.price + RUBLE_SIGN + '/ночь');
  setField('type', capitalizeFirstLetter(getOfferTypeCaption(offer.type)));
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


var AD_COUNT = 8;

var ads = createAds(AD_COUNT);

var pinElements = createPinElements(ads);

addElementsToHTML(pinElements, document.querySelector('.tokyo__pin-map'));

renderDialogPanel(ads[0], '#lodge-template', '.dialog__panel', '.dialog__title');

