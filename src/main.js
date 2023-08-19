
import TripPresenter from './presenter/trip-presenter.js';
import HeaderPresenter from './presenter/header-presenter.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destination-model.js';
import MockService from './service/mock-service.js';


const tripContainer = document.querySelector('.trip-events');
const tripMainElement = document.querySelector('.trip-main');
const tripFilterContainer = document.querySelector('.trip-controls__filters');

const mockService = new MockService();
const pointsModel = new PointsModel(mockService);
const offersModel = new OffersModel(mockService);
const destinationsModel = new DestinationsModel(mockService);

const tripPresenter = new TripPresenter({
  tripContainer: tripContainer,
  destinationsModel,
  pointsModel,
  offersModel,
});

const headerPresenter = new HeaderPresenter({
  headerContainer: tripMainElement,
  pointsModel,
  filterContainer: tripFilterContainer,
});


headerPresenter.init();
tripPresenter.init();
