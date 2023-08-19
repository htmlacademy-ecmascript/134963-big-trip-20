import FilterView from '../view/filter-view.js';
import TripInfoView from '../view/trip-info-view.js';
import NewTaskButtonView from '../view/new-task-button-view.js';
import { generateFilter } from '../mock/filter.js';
import { render, RenderPosition } from '../framework/render';


export default class HeaderPresenter {
  #headerContainer = null;
  #filterContainer = null;

  #filters = [];

  #pointsModel = null;

  constructor ({headerContainer, pointsModel, filterContainer}) {
    this.#headerContainer = headerContainer;
    this. #filterContainer = filterContainer;

    this.#pointsModel = pointsModel;
    this.#filters = generateFilter(this.#pointsModel.points);
  }

  init() {
    this.#renderFilters();
    this.#renderNewTaskButtonView();
    this.#renderTripInfoView();


  }

  #renderTripInfoView() {
    render(new TripInfoView(), this.#headerContainer, RenderPosition.AFTERBEGIN);
  }

  #renderNewTaskButtonView() {
    render(new NewTaskButtonView(),this.#headerContainer);
  }

  #renderFilters() {
    render(new FilterView({ filters: this.#filters }), this.#filterContainer);
  }
}
