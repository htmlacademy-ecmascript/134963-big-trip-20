import {getDate} from '../utils/utils.js';
import {getRandomInteger } from '../utils/common.js';


const generateMockPoints = (type, destinationId, offerIds) => ({
  id: crypto.randomUUID(),
  basePrice: getRandomInteger(1, 10000),
  dateFrom: getDate({next:false}),
  dateTo: getDate({next:true}),
  destination: destinationId,
  isFavorite: !!getRandomInteger(0,1),
  offers: offerIds,
  type

});

export{generateMockPoints};
