import { getRandomArrayElement , getRandomInteger} from './utils.js';
import { TYPEARRAY, TITLEARRAY } from './const.js';

const mockOffers = [
  {
    type: getRandomArrayElement(TYPEARRAY),
    offers: [
      {
        id: getRandomInteger(1, 1000),
        title: getRandomArrayElement(TITLEARRAY),
        price: getRandomInteger(1, 100),
      }
    ]
  },
  {
    type: getRandomArrayElement(TYPEARRAY),
    offers: [
      {
        id: String(getRandomInteger(1, 1000)),
        title: getRandomArrayElement(TITLEARRAY),
        price: getRandomInteger(1, 15000),
      }
    ]
  },
  {
    type: getRandomArrayElement(TYPEARRAY),
    offers: [
      {
        id: getRandomInteger(1, 1000),
        title: getRandomArrayElement(TITLEARRAY),
        price: getRandomInteger(1, 100),
      }
    ]
  },
  {
    type: getRandomArrayElement(TYPEARRAY),
    offers: [
      {
        id: getRandomInteger(1, 1000),
        title: getRandomArrayElement(TITLEARRAY),
        price: getRandomInteger(1, 300),
      }
    ]
  },
  {
    type: getRandomArrayElement(TYPEARRAY),
    offers: [
      {
        id: getRandomInteger(1, 1000),
        title: getRandomArrayElement(TITLEARRAY),
        price: getRandomInteger(1, 1000),
      }
    ]
  },
];

const generateOffers = () => mockOffers;

export {generateOffers};
