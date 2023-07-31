import { getRandomInteger } from '../utils.js';

const generateMockOffers = (type) => ({
  id: crypto.randomUUID(),
  title: `Offer ${type}`,
  price: getRandomInteger(1, 100)
});


export {generateMockOffers};
