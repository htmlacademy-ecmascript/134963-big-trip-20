import TripPointView from '../view/trip-point-view.js';
import TripPointsListView from '../view/trip-point-list-view.js';
import FormCreateView from '../view/form-view.js';
import SortView from '../view/sort-view.js';
import { render, remove } from '../framework/render.js';

export default class TripPresenter {
  #tripContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;

  #points = [];

  #tripComponent = new TripPointsListView();
  #sortComponent = new SortView();

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
    this.#renderTripPontForm();
    this.#renderTripPointList();
  }

  #renderTripPointSort() {
    render(this.#sortComponent, this.#tripContainer);
  }

  #renderTripPoint () {
    render(this.#tripComponent, this.#tripContainer);
  }

  #renderTripPontForm() {
    render(
      new FormCreateView({
        point: this.#points[0],
        pointDestination: this.#destinationsModel.destinations,
        pointOffer: this.#offersModel.offers
      }),
      this.#tripComponent.element
    );
  }

  #renderTripPointList() {
    this.#points.forEach((point) => {
      render(
        new TripPointView({
          point,
          pointDestination: this.#destinationsModel.getById(point.destination),
          pointOffer: this.#offersModel.getByType(point.type)
        }),
        this.#tripComponent.element
      );
    });
  }
}
