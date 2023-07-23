const TYPEARRAY = [ 'taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant' ];

const DESCRIPTIONS = [
  'Здесь много интересных и красивых мест, разных памятников.',
  'В городе построено много красивых, современных зданий, которые своим видом нисколько не портят сохранившуюся архитектуру.',
  'В разных районах города есть лыжные базы.',
  'Огромное количество достопримечательностей в центральной части города. На окраине есть аутентичные места для тихого отдыха.',
  'Этот город славится парками развлечения и игорными домами.',
  'Идеальное место для тихого отдыха.'
];

const CTTIES = ['Rubcovsk', 'Novosibirsk', 'Barnaul', 'Moscow', 'London', 'Rome', 'Saint-Petersburg'];

const DEFAULT_TYPE = 'flight';

const POINT_EMPLY = {
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: null,
  isFavorite: false,
  offers: [],
  type: DEFAULT_TYPE,
};

const Duration = {
  MIN: 59,
  DAY: 5,
  HOUR: 5
};

export {TYPEARRAY, DESCRIPTIONS, CTTIES, POINT_EMPLY, Duration};

