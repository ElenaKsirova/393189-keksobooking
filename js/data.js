'use strict';

window.kbData = (function () {
  var LOCATION_X_MIN = 300;
  var LOCATION_X_MAX = 900;

  var LOCATION_Y_MIN = 100;
  var LOCATION_Y_MAX = 500;

  var CHECK_IN_TIMES = ['12:00', '13:00', '14:00'];
  var CHECK_OUT_TIMES = ['12:00', '13:00', '14:00'];

  var OFFER_TYPES = [
    'flat',
    'house',
    'bungalo',
    'palace'
  ];

  var OFFER_MIN_PRICES = [
    1000,
    5000,
    0,
    10000
  ];

  var OFFER_TYPE_CAPTIONS = [
    'квартира',
    'домик',
    'бунгало',
    'дворец',
  ];

  var OFFER_ROOM_NUMBERS = [
    '1', '2', '3', '100'
  ];

  var OFFER_CAPACITY = [
    '1', '2', '3', '0'
  ];

  var OFFER_FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];


  var getRandomFromRange = window.utils.getRandomFromRange;
  var getRandomItem = window.utils.getRandomItem;
  var getRandomList = window.utils.getRandomList;


  var getOfferTypeByTitle = function (offerTitle) {
    offerTitle = offerTitle.toLowerCase();

    for (var i = 0; i < OFFER_TYPE_CAPTIONS.length; i++) {
      if (offerTitle.indexOf(OFFER_TYPE_CAPTIONS[i]) !== -1) {
        return OFFER_TYPES[i];
      }
    }

    return 'house'; // если тип определить нельзя, возвращаем house
  };


  var getOfferTypeCaption = function (offerType) {
    var offerTypeIndex = OFFER_TYPES.indexOf(offerType);

    return (
      (offerTypeIndex !== -1) ? OFFER_TYPE_CAPTIONS[offerTypeIndex] : offerType
    );
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


  var createAds = function (adCount) {
    var newAds = [];

    var userCount = adCount;

    var userNumStrings = generateUserNumStrings(userCount);


    for (var i = 0; i < adCount; i++) {
      var offerTitle = getRandomOfferTitle();

      var offerType = getOfferTypeByTitle(offerTitle);

      var offerRooms = Math.round(getRandomFromRange(1, 5));

      var locationX = Math.round(getRandomFromRange(LOCATION_X_MIN, LOCATION_X_MAX));
      var locationY = Math.round(getRandomFromRange(LOCATION_Y_MIN, LOCATION_Y_MAX));

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
          'checkin': getRandomItem(CHECK_IN_TIMES),
          'checkout': getRandomItem(['12:00', '13:00', '14:00']),
          'features': getRandomList(OFFER_FEATURES),
          'description': '',
          'photos': ''
        },

        'location': {'x': locationX, 'y': locationY}
      };
    }

    return newAds;
  };

  return {
    locationLimits: {
      x: {
        min: LOCATION_X_MIN,
        max: LOCATION_X_MAX
      },
      y: {
        min: LOCATION_Y_MIN,
        max: LOCATION_Y_MAX
      }
    },
    checkInTimes: CHECK_IN_TIMES,
    checkOutTimes: CHECK_OUT_TIMES,
    offerTypes: OFFER_TYPES,
    offerMinPrices: OFFER_MIN_PRICES,
    offerRoomNumbers: OFFER_ROOM_NUMBERS,
    offerCapacity: OFFER_CAPACITY,
    getOfferTypeCaption: getOfferTypeCaption,
    createAds: createAds
  };
})();
