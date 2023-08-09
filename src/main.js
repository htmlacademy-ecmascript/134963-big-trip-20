import NewTaskButtonView from './view/new-task-button-view.js';
import FilterView from './view/filter-view.js';
import TripInfoView from './view/trip-info-view.js';
import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destination-model.js';
import MockService from './service/mock-service.js';
import { generateFilter } from './mock/filter.js';
import { render} from './framework/render.js';


const tripContainer = document.querySelector('.trip-events');
const tripMainElement = document.querySelector('.trip-main');
const tripFilters = document.querySelector('.trip-controls');

const mockService = new MockService();
const pointsModel = new PointsModel(mockService);
const offersModel = new OffersModel(mockService);
const destinationsModel = new DestinationsModel(mockService);
const filters = generateFilter(mockService.points);
const info = mockService.points;

const tripPresenter = new TripPresenter({
  tripContainer: tripContainer,
  destinationsModel,
  pointsModel,
  offersModel,
});


render(new TripInfoView(mockService), tripMainElement);
render(new FilterView({filters}), tripFilters);
render(new NewTaskButtonView(), tripMainElement);
tripPresenter.init();
