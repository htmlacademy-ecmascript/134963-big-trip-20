import {remove, render, RenderPosition} from '../framework/render.js';
import { UserAction, UpdateType } from '../const';
import FormView from '../view/form-view';

export default class NewEventPresenter {

  #pointListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;

  #destinations = null;
  #offers = null;

  #FormComponent = null;

  constructor ({pointListContainer, onDataChange, onDestroy, destinations, offers}) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  init() {
    if (this.#FormComponent !== null) {
      return;
    }

    this.#FormComponent = new FormView({
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
      destinations: this.#destinations,
      offers: this.#offers,
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

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      { ...point, id: crypto.randomUUID() },
    );
    this.destroy();
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
