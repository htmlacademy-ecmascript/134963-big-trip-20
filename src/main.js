
import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destination-model.js';
import FilterModel from './model/filter-model.js';
import TripApiService from './service/trip-api-service.js';
import { AUTHORIZATION, END_POINT } from './const.js';

const tripApiService = new TripApiService(END_POINT, AUTHORIZATION);

const tripContainer = document.querySelector('.trip-events');
const tripMainElement = document.querySelector('.trip-main');
const tripFilterContainer = document.querySelector('.trip-controls__filters');

const offersModel = new OffersModel(tripApiService);
const filterModel = new FilterModel();
const destinationsModel = new DestinationsModel(tripApiService);
const pointsModel = new PointsModel({
  service: tripApiService,
  offersModel,
  destinationsModel,
});

const tripPresenter = new TripPresenter({
  tripContainer: tripContainer,
  tripFilterContainer: tripFilterContainer,
  tripMainElement: tripMainElement,
  destinationsModel,
  pointsModel,
  offersModel,
  filterModel,
});

tripPresenter.init();
pointsModel.init();
