import NewTaskButtonView from './view/new-task-button-view.js';
import render from './render.js';
import FilterView from './view/filter-view.js';
import TripInfo from './view/trip-info.js';
import TripPresenter from './presenter/trip-presenter.js';

const tripSort = document.querySelector('.trip-events');
const tripMainElement = document.querySelector('.trip-main');
const siteHeaderElement = document.querySelector('.page-header');
const tripFilters = document.querySelector('.trip-controls__filters');
const tripPresenter = new TripPresenter({tripContainer: tripSort});


render(new NewTaskButtonView(), siteHeaderElement);
render(new FilterView(), tripFilters);
render(new TripInfo(), tripMainElement);
tripPresenter.init();
