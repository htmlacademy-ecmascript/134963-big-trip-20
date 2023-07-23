import { generateMockPoints } from '../mock/points.js';
import { generateMockDestinations } from '../mock/destinations.js';
import { generateMockOffers } from '../mock/offers.js';

import { TYPEARRAY } from '../mock/const.js';

import { getRandomInteger, getRandomArrayElement} from '../mock/utils.js';

export default class MockService {
  destinations = [];
  offers = [];
  points = [];

  constructor() {
    this.destinations = this.generateDestinations();
    this.points = this.generatePoints();
    this.offers = this.generateOffers();
  }

  getDestination(){
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }

  getPoints() {
    return this.points;
  }

  generateDestinations() {
    return Array.from(
      {length:5},
      () => generateMockDestinations()
    );
  }

  generateOffers() {
    return TYPEARRAY.map((type) => ({
      type,
      offers: Array.from({length:getRandomInteger(0, 5)}, () => generateMockOffers(type))
    }));
  }

  generatePoints() {
    return Array.from({length: 5}, () => {
      const type = getRandomArrayElement(TYPEARRAY);
      const destination = getRandomArrayElement(this.destinations);

      const hasOffers = getRandomInteger(0, 1);

      const offersByType = this.offers
        .find((offerByType) => offerByType.type === type);

      const offerIds = (hasOffers)
        ? offersByType.offers
          .slice(0, getRandomInteger(0, 5))
          .map((offer) => offer.id)
        : [];
      return generateMockPoints(type, destination.id, offerIds);
    });
  }
}
