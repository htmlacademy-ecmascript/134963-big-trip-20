import TripPointsListView from '../view/trip-point-list-view.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import SortView from '../view/sort-view.js';
import EmptyView from '../view/list-empty-view.js';
import NewEventPresenter from './new-event-presenter.js';
import PointPresenter from './point-presenter.js';
import LoadingView from '../view/loading-view.js';
import FilterPresenter from './filter-presenter.js';
import HeaderPresenter from './header-presenter.js';
import NewTaskButtonView from '../view/new-task-button-view.js';
import ErrorView from '../view/error-view.js';
import { SortType, UpdateType, UserAction, FilterType } from '../const.js';
import { sortByPriceDesc , sortByTimeDesc, sortByDateFrom } from '../utils/sort.js';
import { remove, render} from '../framework/render.js';
import {filter} from '../utils/filter.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class TripPresenter {
  #tripContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #filterModel = null;
  #tripFilterContainer = null;
  #tripMainElement = null;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });


  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.EVERYTHING;

  #tripListComponent = new TripPointsListView();
  #loadingComponent = new LoadingView();
  #errorComponent = new ErrorView();
  #newEventButtonComponent = null;
  #sortComponent = null;
  #emptyListComponent = null;

  #pointPresenters = new Map();
  #newEventPresenter = null;

  #isLoading = true;

  constructor({ tripContainer, tripFilterContainer, tripMainElement, pointsModel, offersModel, destinationsModel, filterModel}) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#filterModel = filterModel;
    this.#tripFilterContainer = tripFilterContainer;
    this.#tripMainElement = tripMainElement;

    this.#newEventPresenter = new NewEventPresenter({
      destinations: this.#destinationsModel,
      offers: this.#offersModel,
      pointListContainer: this.#tripListComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#handleNewEventFormClose,
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
        return filteredPoints.sort(sortByTimeDesc);
      case SortType.DEFAULT:
        return filteredPoints.sort(sortByDateFrom);
    }

    return filteredPoints;
  }

  init() {
    this.#renderTripPoint();
    this.#renderFilters();
    this.#renderNewEventButton();
    this.#renderHeaderPresenter();
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

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (points.length === 0) {
      this.#renderEmptyList();
      return;
    }
    this.#renderTripPointSort();
    this.#renderTripPointList();
    points.forEach((point) => this.#renderPoint(point));
  }

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

  #renderFilters() {
    const filterPresenter = new FilterPresenter({
      filterContainer: this.#tripFilterContainer,
      filterModel: this.#filterModel,
      pointsModel: this.#pointsModel,
    });

    filterPresenter.init();
  }

  #renderHeaderPresenter() {
    const headerPresenter = new HeaderPresenter({ headerContainer: this.#tripMainElement});

    headerPresenter.init();
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#tripContainer);
  }

  #renderError() {
    render(this.#errorComponent, this.#tripContainer);
  }

  #renderNewEventButton() {
    this.#newEventButtonComponent = new NewTaskButtonView({
      onClick: this.#handleNewEventButtonClick,
    });

    render(this.#newEventButtonComponent, this.#tripMainElement);
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
    remove(this.#loadingComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }

    if (this.#emptyListComponent) {
      remove(this.#emptyListComponent);
    }
  }

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newEventPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch(err) {
          this.#newEventPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
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
      case UpdateType.INIT:
        this.#isLoading = false;
        this.#clearContainer();
        remove(this.#loadingComponent);
        this.#renderTripPoint();
        break;
      case UpdateType.ERROR:
        this.#isLoading = false;
        this.#clearContainer();
        remove(this.#loadingComponent);
        remove(this.#newEventButtonComponent);
        this.#renderError();
        break;
    }
  };

  #handleModeChange = () => {
    this.#newEventPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType){
      return;
    }
    this.#currentSortType = sortType;

    this.#clearContainer();
    this.#renderTripPoint();
  };

  #handleNewEventFormClose = () => {
    this.#newEventButtonComponent.element.disabled = false;
  };

  #handleNewEventButtonClick = () => {
    this.createPoint();
    this.#newEventButtonComponent.element.disabled = true;
  };
}


