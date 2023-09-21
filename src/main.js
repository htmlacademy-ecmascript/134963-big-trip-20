
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
import TripApiService from './service/trip-api-service.js';


const AUTHORIZATION = 'Basic hS2sfS24wcl1sa2j';
const END_POINT = 'https://20.ecmascript.pages.academy/big-trip';

const tripContainer = document.querySelector('.trip-events');
const tripMainElement = document.querySelector('.trip-main');
const tripFilterContainer = document.querySelector('.trip-controls__filters');
// const filterContainer = document.querySelector('');

const mockService = new MockService();
const pointsModel = new PointsModel({
  service: new TripApiService(END_POINT, AUTHORIZATION)
});
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
