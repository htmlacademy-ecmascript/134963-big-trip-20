import { getRandomArrayElement} from '../utils.js';
import { CITES, DESCRIPTIONS } from '../const.js';

const generateMockDestinations = () => {
  const city = getRandomArrayElement(CITES);
  const description = getRandomArrayElement(DESCRIPTIONS);

  return {
    id: crypto.randomUUID(),
    name: city,
    description: description,
    pictures : [
      {
        'src': `https://loremflickr.com/248/152?random=${crypto.randomUUID()}`,
        'description': `${city} description`,
      }
    ]
  };

};


export {generateMockDestinations};


