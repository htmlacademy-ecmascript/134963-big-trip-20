import NewTaskButtonView from './view/new-task-button-view.js';
import { render, RenderPosition } from './render.js';
import FilterView from './view/filter-view.js';
import TripInfo from './view/trip-info.js';
import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destination-model.js';
import MockServive from './service/mock-service.js';


const tripContainer = document.querySelector('.trip-events');
const tripMainElement = document.querySelector('.trip-main');
const tripFilters = document.querySelector('.trip-controls');

const mockService = new MockServive();
const pointsModel = new PointsModel(mockService);
const offersModel = new OffersModel(mockService);
const destinationsModel = new DestinationsModel(mockService);

const tripPresenter = new TripPresenter({
  tripContainer: tripContainer,
  pointsModel,
  offersModel,
  destinationsModel
});


render(new TripInfo(), tripMainElement, RenderPosition.AFTERBEGIN);
render(new FilterView(), tripFilters);
render(new NewTaskButtonView(), tripMainElement);
tripPresenter.init();
