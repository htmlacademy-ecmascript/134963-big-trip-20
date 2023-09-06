import TripPointsListView from '../view/trip-point-list-view.js';
import SortView from '../view/sort-view.js';
import EmptyView from '../view/list-empty-view.js';
import PointPresenter from './point-presenter.js';
import { SortType } from '../const.js';
import { sortByPriceDesc , sortByTimeDesc, sortByDateFrom } from '../utils/sort.js';
import { render} from '../framework/render.js';


export default class TripPresenter {
  #tripContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;

  

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
    this.#sortPoints(this.#currentSortType); // что тут7
    render(this.#sortComponent, this.#tripContainer);
  }

  #renderTripPoint() {
    if (this.#points === 0) {
      this.#renderEmptyList();
    } else {
      this.#renderTripPointList();
      this.#points.forEach((point) => {
        this.#renderPoint(point);
      });
    }
  }

  #handlePointUpdate = (updatedPoint) => {
     // Здесь будем вызывать обновление модели
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListComponent: this.#tripListComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#handlePointUpdate,
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
    this.#currentSortType =  sortType;

    this.#clearPointList();
    this.#renderTripPoint();
  };
}


