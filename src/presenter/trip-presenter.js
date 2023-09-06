import TripPointsListView from '../view/trip-point-list-view.js';
import SortView from '../view/sort-view.js';
import EmptyView from '../view/list-empty-view.js';
import PointPresenter from './point-presenter.js';
import { SortType,UpdateType, UserAction } from '../const.js';
import { sortByPriceDesc , sortByTimeDesc, sortByDateFrom } from '../utils/sort.js';
import { remove, render} from '../framework/render.js';


export default class TripPresenter {
  #tripContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;


  #currentSortType = SortType.DEFAULT;


  #tripListComponent = new TripPointsListView();
  #sortComponent = null;
  #emptyListComponent = new EmptyView();

  #pointPresenters = new Map();

  constructor({ tripContainer, pointsModel, offersModel, destinationsModel }) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;

    this.#pointsModel.addObserver(this.#handleModelPoint);
  }

  get points() {


    switch (this.#currentSortType) {
      case SortType.PRICE_DESC:
        return [...this.#pointsModel.points].sort(sortByPriceDesc);
      case SortType.TIME_DESC:
        return [...this.#pointsModel.points].sort(sortByTimeDesc);
      case SortType.DEFAULT:
        return [...this.#pointsModel.points].sort(sortByDateFrom);
    }

    return this.#pointsModel.points;
  }

  init() {
    this.#renderTripPointSort();
    this.#renderTripPoint();
  }

  #renderTripPointList() {
    render(this.#tripListComponent, this.#tripContainer);
  }

  #renderEmptyList() {
    render(this.#emptyListComponent, this.#tripContainer);
  }

  #renderTripPointSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange,
      currentSortType: this.#currentSortType,
    });
    // this.#sortPoints(this.#currentSortType); // что тут7
    render(this.#sortComponent, this.#tripContainer);
  }

  #renderTripPoint() {
    const points = this.points;

    if (points.length === 0) {
      this.#renderEmptyList();
    } else {
      this.#renderTripPointList();
      points.forEach((point) => {
        this.#renderPoint(point);
      });
    }
  }

  #handleViewAction = (actionType, updateType, update) => {
    console.log(actionType, updateType, update);
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelPoint = (updateType, data) => {
    console.log(updateType, data);
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearPoint();
        this.#renderTripPoint();
        break;
      case UpdateType.MAJOR:
        this.#clearPoint({resetSortType:true});
        this.#renderTripPoint();
        break;
    }
  };

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListComponent: this.#tripListComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }


  #clearPoint({resetSortType = false} = {}) {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);
    remove();

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }

    if (this.#emptyListComponent) {
      remove(this.#emptyListComponent);
    }
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType){
      return;
    }
    this.#currentSortType = sortType;

    this.#clearPoint({resetSortType: true});
    this.#renderTripPoint();
  };
}


