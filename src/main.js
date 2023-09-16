
import TripPresenter from './presenter/trip-presenter.js';
import HeaderPresenter from './presenter/header-presenter.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destination-model.js';
import MockService from './service/mock-service.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NewTaskButtonView from './view/new-task-button-view.js';
import {render} from './framework/render.js';

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
  onNewEventDestroy: handleNewEventFormClose
});

const headerPresenter = new HeaderPresenter({
  headerContainer: tripMainElement,
  pointsModel,
  filterContainer: tripFilterContainer,
});

const filterPresenter = new FilterPresenter({
  filterContainer: tripMainElement,
  filterModel,
  pointsModel,
});

const newEventButtonComponent = new NewTaskButtonView({
  onClick: handleNewEventButtonClick
});

function handleNewEventFormClose() {
  newEventButtonComponent.element.disabled = false;
}

function handleNewEventButtonClick() {
  tripPresenter.createPoint();
  newEventButtonComponent.element.disabled = true;
}

render(newEventButtonComponent, tripMainElement);


headerPresenter.init();
tripPresenter.init();
filterPresenter.init();
