import TripPointView from '../view/trip-point-view.js';
import TripPointsListView from '../view/trip-point-list-view.js';
import FormCreateView from '../view/form-view.js';
import SortView from '../view/sort-view.js';
import EmptyView from '../view/list-empty-view.js';
import { render, remove, replace } from '../framework/render.js';

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
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFromFormToItem();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const eventComponent = new TripPointView({
      point,
      pointDestination: this.#destinationsModel.getById(point.destination),
      pointOffer: this.#offersModel.getByType(point.type),
      onFormClick: () => {
        replaceFromItemToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const editEventComponent = new FormCreateView(
      {
        point,
        pointDestination: this.#destinationsModel.destinations,
        pointOffer: this.#offersModel.offers,
        onFormSubmit: () => {
          replaceFromFormToItem();
          document.removeEventListener('keydown', escKeyDownHandler);
        },
        onDeleteClick: () => {
          document.removeEventListener('keydown', escKeyDownHandler);
          removeForm();
        },
        onToggleClick: () => {
          replaceFromFormToItem();
          document.removeEventListener('keydown', escKeyDownHandler);
        },
      }
    );

    function replaceFromItemToForm() {
      replace(editEventComponent, eventComponent);
    }

    function replaceFromFormToItem() {
      replace(eventComponent, editEventComponent);
    }

    function removeForm() {
      remove(editEventComponent);
    }

    render(eventComponent, this.#tripComponent.element);
  }
}

