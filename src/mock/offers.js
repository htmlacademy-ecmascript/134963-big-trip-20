import { getRandomInteger } from './utils.js';

const generateMockOffers = (type) => ({
  id: crypto.randomUUID(),
  title: `Offer ${type}`,
  price: getRandomInteger(1, 10000)
});


export {generateMockOffers};
