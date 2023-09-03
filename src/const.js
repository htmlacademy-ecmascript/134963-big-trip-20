const TYPES = [ 'taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant' ];

const DESCRIPTIONS = [
  'Здесь много интересных и красивых мест, разных памятников.',
  'В городе построено много красивых, современных зданий, которые своим видом нисколько не портят сохранившуюся архитектуру.',
  'В разных районах города есть лыжные базы.',
  'Огромное количество достопримечательностей в центральной части города. На окраине есть аутентичные места для тихого отдыха.',
  'Этот город славится парками развлечения и игорными домами.',
  'Идеальное место для тихого отдыха.'
];

const CITES = ['Rubcovsk', 'Novosibirsk', 'Barnaul', 'Moscow', 'London', 'Rome', 'Saint-Petersburg'];

const DEFAULT_TYPE = 'flight';

const DATE_FORMAT = {
  HOUR_MINUTES: 'H:mm',
  MONTH_DAY : 'MMM D',
  YEAR_MONTH_DAY: 'YY-MM-DD',
  YEAR_MONTH_DAY_TIME: 'YYYY-MM-DDTHH:mm',
  DAY_MONTH_YEAR_TIME_SLASHED: 'DD/MM/YY HH:mm'
};

const POINT_EMPTY = {
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
  DAY: 7,
  HOUR: 23
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const SortType = {
  DEFAULT: 'default',
  TIME_DESC: 'time-desc',
  PRICE_DESC: 'price-desc',
};

export {
  TYPES,
  DESCRIPTIONS,
  CITES,
  POINT_EMPTY,
  DATE_FORMAT,
  Duration,
  FilterType,
  SortType
};
