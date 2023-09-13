import TripPointsListView from '../view/trip-point-list-view.js';
import SortView from '../view/sort-view.js';
import EmptyView from '../view/list-empty-view.js';
import NewEventPresenter from './new-event-presenter.js';
import PointPresenter from './point-presenter.js';
import { SortType, UpdateType, UserAction, FilterType } from '../const.js';
import { sortByPriceDesc , sortByTimeDesc, sortByDateFrom } from '../utils/sort.js';
import { remove, render} from '../framework/render.js';
import {filter} from '../utils/filter.js';


export default class TripPresenter {
  #tripContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #filterModel = null;


  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.EVERYTHING;

  #tripListComponent = new TripPointsListView();
  #sortComponent = null;
  #emptyListComponent = null;

  #pointPresenters = new Map();
  #newEventPresenter = null;

  constructor({ tripContainer, pointsModel, offersModel, destinationsModel, filterModel, onNewEventDestroy }) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#filterModel = filterModel;

    this.#newEventPresenter = new NewEventPresenter({
      destinations: this.#destinationsModel,
      offers: this.#offersModel,
      pointListContainer: this.#tripListComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewEventDestroy,
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filters;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);
    switch (this.#currentSortType) {
      case SortType.PRICE_DESC:
        return filteredPoints.sort(sortByPriceDesc);
      case SortType.TIME_DESC:
        console.log(this.#currentSortType, 'and');
        return filteredPoints.sort(sortByTimeDesc);
      case SortType.DEFAULT:
        return filteredPoints.sort(sortByDateFrom);
    }

    return filteredPoints;
  }

  init() {
    this.#renderTripPoint();
  }

  #renderTripPointList() {
    render(this.#tripListComponent, this.#tripContainer);
  }

  #renderEmptyList() {
    this.#emptyListComponent = new EmptyView({
      filterType: this.#filterType
    });

    render(this.#emptyListComponent, this.#tripContainer);
  }

  #renderTripPointSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange,
      currentSortType: this.#currentSortType,
    });
    render(this.#sortComponent, this.#tripContainer);
  }

  #renderTripPoint() {
    const points = this.points;

    if (points.length === 0) {
      this.#renderEmptyList();
      return;
    }
    this.#renderTripPointSort();
    this.#renderTripPointList();
    points.forEach((point) => this.#renderPoint(point));

  }

  #handleViewAction = (actionType, updateType, update) => {
    console.log({actionType});
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

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearContainer();
        this.#renderTripPoint();
        break;
      case UpdateType.MAJOR:
        this.#clearContainer({resetSortType:true});
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

  createPoint() {
    this.#currentSortType = SortType.DEFAULT;
    this.#filterModel.setFilters(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newEventPresenter.init();
  }

  #clearContainer({resetSortType = false} = {}) {
    this.#newEventPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }

    if (this.#emptyListComponent) {
      remove(this.#emptyListComponent);
    }
  }

  #handleModeChange = () => {
    this.#newEventPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType){
      return;
    }
    this.#currentSortType = sortType;

    this.#clearContainer({resetSortType: true});
    this.#renderTripPoint();
  };
}


