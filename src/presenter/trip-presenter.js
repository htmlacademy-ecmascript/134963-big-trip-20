import TripPointsListView from '../view/trip-point-list-view.js';
import SortView from '../view/sort-view.js';
import EmptyView from '../view/list-empty-view.js';
import PointPresenter from './point-presenter.js';
import { render, remove, replace } from '../framework/render.js';

export default class TripPresenter {
  #tripContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;

  #points = [];

  #tripComponent = new TripPointsListView();
  #sortComponent = new SortView();

  #pointPresenter = new Map();

  constructor({ tripContainer, pointsModel, offersModel, destinationsModel }) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;

    this.#points = [...this.#pointsModel.points];
  }

  init() {
    this.#renderTripPointSort();
    this.#renderTripPoint();
    this.#renderTripPointList();
  }

  #renderTripPointSort() {
    if (this.#points.length === 0) {
      render(new EmptyView(), this.#tripContainer);
    } else {
      render(this.#sortComponent, this.#tripContainer);
    }
  }

  #renderTripPoint () {
    render(this.#tripComponent, this.#tripContainer);
  }

  #renderTripPointList() {
    this.#points.forEach((point) => {
      this.#renderEvent(point);
    });
  }

  #renderEvent(point) {
    const pointPresenter = new PointPresenter({
      pointListComponent: this.#tripComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
    });

    pointPresenter.init(point);

    this.#pointPresenter.set(point.id, pointPresenter);
  }
}

