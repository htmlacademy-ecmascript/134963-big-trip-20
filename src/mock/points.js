import { getRandomInteger, getRandomArrayElement} from './utils.js';
import {TYPEARRAY} from './const.js';

const mockPoints = [
  {
    id: getRandomInteger(1, 123),
    basePrice: 1100,
    dateFrom: 'Fri Jul 14 2023 20:18:22 GMT+0700 (Новосибирск, стандартное время)',
    dateTo: 'Fri Jul 14 2023 20:18:22 GMT+0700 (Новосибирск, стандартное время)',
    destination: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e04',
    isFavorite: false,
    offers: ['b4c3e4e6-9053-42ce-b747-e281314baa31'],
    type: 'taxi',
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808c',
    basePrice: 1100,
    dateFrom: 'Fri Jul 14 2023 20:18:22 GMT+0700 (Новосибирск, стандартное время)',
    dateTo: 'Fri Jul 14 2023 20:18:22 GMT+0700 (Новосибирск, стандартное время)',
    destination: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e04',
    isFavorite: false,
    offers: ['b4c3e4e6-9053-42ce-b747-e281314baa31'],
    type: 'taxi',
  },
  {
    id: crypto.randomUUID(),
    basePrice: 1100,
    dateFrom: 'Fri Jul 14 2023 20:18:22 GMT+0700 (Барнаул, стандартное время)',
    dateTo: 'Fri Jul 14 2023 20:18:22 GMT+0700 (Новосибирск, стандартное время)',
    destination: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e04',
    isFavorite: false,
    offers: ['b4c3e4e6-9053-42ce-b747-e281314baa31'],
    type: getRandomArrayElement(TYPEARRAY),
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808c',
    basePrice: 1100,
    dateFrom: 'Fri Jul 14 2023 20:18:22 GMT+0700 (Новокузнецк, стандартное время)',
    dateTo: 'Fri Jul 14 2023 20:18:22 GMT+0700 (Мариинск, стандартное время)',
    destination: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e04',
    isFavorite: false,
    offers: ['b4c3e4e6-9053-42ce-b747-e281314baa31'],
    type: getRandomArrayElement(TYPEARRAY),
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808c',
    basePrice: 1100,
    dateFrom: 'Fri Jul 14 2023 20:18:22 GMT+0700 (Симбирка, стандартное время)',
    dateTo: 'Fri Jul 14 2023 20:18:22 GMT+0700 (Новосибирск, стандартное время)',
    destination: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e04',
    isFavorite: false,
    offers: ['b4c3e4e6-9053-42ce-b74781314baa31'],
    type: 'taxi',
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808c',
    basePrice: 1100,
    dateFrom: 'Fri Jul 14 2023 20:18:22 GMT+0700 (Новосибирск, стандартное время)',
    dateTo: 'Fri Jul 14 2023 20:18:22 GMT+0700 (Новосибирск, стандартное время)',
    destination: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e04',
    isFavorite: false,
    offers: ['b4c3e4e6-9053-42ce-b747-e28aa31'],
    type: getRandomArrayElement(TYPEARRAY),
  },
];

const getMockPoints = () => mockPoints;

const getRandomPoints = () => getRandomArrayElement(mockPoints);

export{getMockPoints, getRandomPoints};
