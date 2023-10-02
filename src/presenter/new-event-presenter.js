import {remove, render, RenderPosition} from '../framework/render.js';
import { UserAction, UpdateType } from '../const';
import FormView from '../view/form-view';

export default class NewEventPresenter {

  #pointListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;

  #point = null;
  #destinationsModel = null;
  #offersModel = null;

  #FormComponent = null;

  constructor ({pointListContainer, onDataChange, onDestroy, point, destinations, offers}) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
    this.#point = point;
    this.#destinationsModel = destinations;
    this.#offersModel = offers;
  }

  init() {
    if (this.#FormComponent !== null) {
      return;
    }

    this.#FormComponent = new FormView({
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
      isEditMode: true,
      point: this.#point,
      pointDestinations: this.#destinationsModel.destinations,
      pointOffers: this.#offersModel.offers,
    });

    render(this.#FormComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#FormComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#FormComponent);
    this.#FormComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    this.#FormComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#FormComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#FormComponent.shake(resetFormState);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      { ...point, id: crypto.randomUUID() },
    );
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
