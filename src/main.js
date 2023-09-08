
import TripPresenter from './presenter/trip-presenter.js';
import HeaderPresenter from './presenter/header-presenter.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destination-model.js';
import MockService from './service/mock-service.js';
import FilterModel from './model/filter-model.js';
import FilterView from './view/filter-view.js';
import {render} from './framework/render.js';

const filters = [
  {
    type: 'all',
    count: 0,
  },
];

const tripContainer = document.querySelector('.trip-events');
const tripMainElement = document.querySelector('.trip-main');
const tripFilterContainer = document.querySelector('.trip-controls__filters');
// const filterContainer = document.querySelector('');

const mockService = new MockService();
const pointsModel = new PointsModel(mockService);
const offersModel = new OffersModel(mockService);
const filterModel = new FilterModel();
const destinationsModel = new DestinationsModel(mockService);

const tripPresenter = new TripPresenter({
  tripContainer: tripContainer,
  destinationsModel,
  pointsModel,
  offersModel,
  filterModel,
});

const headerPresenter = new HeaderPresenter({
  headerContainer: tripMainElement,
  pointsModel,
  filterContainer: tripFilterContainer,
});


render(new FilterView({
  filters,
  currentFilterType: 'all',
  onFilterTypeChange: () => {}

}), tripMainElement);

headerPresenter.init();
tripPresenter.init();
