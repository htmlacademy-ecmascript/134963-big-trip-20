import { getRandomInteger} from './utils.js';

const mockDestinations = [
  {
    id: String(getRandomInteger(1, 1000)),
    description: 'Novosibirsk, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Novosibirsk',
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=6',
        description: 'Novosibirsk parliament building',
      }
    ]
  },
  {
    id: String(getRandomInteger(1, 1000)),
    description: 'Novokuzneck, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Novokuzneck',
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=7',
        description: 'Novokuzneck parliament building',
      }
    ]
  },
  {
    id: String(getRandomInteger(1, 1000)),
    description: 'Barnaul, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Barnaul',
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=33',
        description: 'Barnaul parliament building',
      }
    ]
  },
  {
    id: String(getRandomInteger(1, 1000)),
    description: 'Tomsk, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Tomsk',
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=64',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      }
    ]
  },
  {
    id: String(getRandomInteger(1, 1000)),
    description: 'Novoaltaysk, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Novoaltaysk',
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=67',
        description: 'Aliquam erat volutpat.',
      }
    ]
  },
  {
    id: String(getRandomInteger(1, 1000)),
    description: 'Rubcovsk, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Rubcovsk',
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=67',
        description: 'Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
      }
    ]
  },
];

const getMockDestinations = () => mockDestinations;

export {getMockDestinations};


