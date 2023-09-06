import TripPointsListView from '../view/trip-point-list-view.js';
import SortView from '../view/sort-view.js';
import EmptyView from '../view/list-empty-view.js';
import PointPresenter from './point-presenter.js';
import { SortType,UpdateType, UserAction } from '../const.js';
import { sortByPriceDesc , sortByTimeDesc, sortByDateFrom } from '../utils/sort.js';
import { render} from '../framework/render.js';


export default class TripPresenter {
  #tripContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;

  #points = null;

  #currentSortType = SortType.DEFAULT;


  #tripListComponent = new TripPointsListView();
  #sortComponent = null;
  #EmptyListComponent = new EmptyView();

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
    render(this.#EmptyListComponent, this.#tripContainer);
  }

  #renderTripPointSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange
    });
    // this.#sortPoints(this.#currentSortType); // что тут7
    render(this.#sortComponent, this.#tripContainer);
  }

  #renderTripPoint() {
    if (this.points === 0) {
      this.#renderEmptyList();
    } else {
      this.#renderTripPointList();
      this.points.forEach((point) => {
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
        // - обновить часть списка (например, когда поменялось описание)
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
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


  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType){
      return;
    }
    this.#currentSortType = sortType;

    this.#clearPointList();
    this.#renderTripPoint();
  };
}


