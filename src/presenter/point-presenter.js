import { replace, render, remove} from '../framework/render';
import TripPointView from '../view/trip-point-view.js';
import FormView from '../view/form-view';
import { UserAction, UpdateType } from '../const';
import { isDatesEqual } from '../utils/utils';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

export default class PointPresenter {
  #pointListComponent = null;

  #pointComponent = null;
  #pointEditComponent = null;

  #point = null;
  #mode = Mode.DEFAULT;

  #offersModel = null;
  #destinationsModel = null;

  #handlePointUpdate = null;
  #handleModeChange = null;


  constructor ({pointListComponent, offersModel, destinationsModel, onDataChange, onModeChange}) {
    this.#pointListComponent = pointListComponent;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#handlePointUpdate = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new TripPointView({
      point: this.#point,
      pointDestinations: this.#destinationsModel.getById(point.destination),
      pointOffers: this.#offersModel.getByType(point.type),
      onEditClick: this.#handleToggleOpen,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#pointEditComponent = new FormView(
      {
        point: this.#point,
        pointDestinations: this.#destinationsModel.destinations,
        pointOffers: this.#offersModel.offers,
        isEditMode: false,
        onFormSubmit: this.#handleFormSubmit,
        onDeleteClick: this.#handleDeleteClick,
        onToggleClick: this.#handleToggleClose,
      }
    );

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#pointListComponent);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFromFormToItem();
    }
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFromFormToItem();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #handleFormSubmit = (updatedPoint) => {
    this.#replaceFromFormToItem();
    this.#handlePointUpdate(
      UserAction.UPDATE_POINT,
      isDatesEqual(this.#point.dateFrom, updatedPoint.dateFrom) ? UpdateType.MINOR : UpdateType.PATCH,
      updatedPoint,
    );
  };

  #handleFavoriteClick = () => {
    this.#handlePointUpdate(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      {...this.#point, isFavorite: !this.#point.isFavorite},
    );
  };

  #handleToggleClose = () => {
    this.#pointEditComponent.reset(this.#point);
    this.#replaceFromFormToItem();
  };

  #handleToggleOpen = () => {
    this.#replaceFromItemToForm();
  };

  #handleDeleteClick = (point) => {
    this.#handlePointUpdate(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point);
  };

  #replaceFromItemToForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFromFormToItem() {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }
}


