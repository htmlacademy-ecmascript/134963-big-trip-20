import { replace, render, remove} from '../framework/render';
import TripPointView from '../view/trip-point-view.js';
import FormView from '../view/form-view';

export default class PointPresenter {
  #pointListComponent = null;

  #pointComponent = null;
  #pointEditComponent = null;

  #offersModel = null;
  #destinationsModel = null;
  #point = null;


  constructor ({pointListComponent, offersModel, destinationsModel}) {
    this.#pointListComponent = pointListComponent;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;

  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new TripPointView({
      point: this.#point,
      pointDestination: this.#destinationsModel.getById(point.destination),
      pointOffer: this.#offersModel.getByType(point.type),
      onEditClick: () => {
        this.#replaceFromItemToForm();
        document.addEventListener('keydown', this.#escKeyDownHandler);
      }
    });

    this.#pointEditComponent = new FormView(
      {
        point: this.#point,
        pointDestination: this.#destinationsModel.destinations,
        pointOffer: this.#offersModel.offers,
        onFormSubmit: () => {
          this.#closeForm();
        },
        onDeleteClick: () => {
          document.removeEventListener('keydown', this.#escKeyDownHandler);
          this.#removeForm();
        },
        onToggleClick: () => {
          this.#closeForm();
        },
      }
    );

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#pointListComponent);
    }

    if (this.#pointListComponent.contains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#pointListComponent.contains(prevPointEditComponent.element)) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFromFormToItem();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #closeForm() {
    this.#replaceFromFormToItem();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceFromItemToForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
  }

  #replaceFromFormToItem() {
    replace(this.#pointComponent, this.#pointEditComponent);
  }

  #removeForm() {
    remove(this.#pointEditComponent);
  }


}


