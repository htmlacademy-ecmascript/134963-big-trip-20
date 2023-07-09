import NewTaskButtonView from './view/new-task-button-view.js';
import { render, RenderPosition } from './render.js';
import FilterView from './view/filter-view.js';
import TripInfo from './view/trip-info.js';
import TripPresenter from './presenter/trip-presenter.js';


const tripContainer = document.querySelector('.trip-events');
const tripMainElement = document.querySelector('.trip-main');
const tripFilters = document.querySelector('.trip-controls');

const tripPresenter = new TripPresenter({tripContainer: tripContainer});


render(new TripInfo(), tripMainElement, RenderPosition.AFTERBEGIN);
render(new FilterView(), tripFilters);
render(new NewTaskButtonView(), tripMainElement);
tripPresenter.init();
