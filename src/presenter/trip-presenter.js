import TripPointsListView from '../view/trip-point-list-view.js';
import SortView from '../view/sort-view.js';
import EmptyView from '../view/list-empty-view.js';
import PointPresenter from './point-presenter.js';
import { SortType } from '../const.js';
import { comparePointPrice, calculateDateRangeDifference } from '../utils/sort.js';
import { updateItem } from '../utils/common.js';
import { render} from '../framework/render.js';


export default class TripPresenter {
  #tripContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;

  #points = null;

  #currentSortType = SortType.DEFAULT;
  #sourcedPoints = [];

  #tripListComponent = new TripPointsListView();
  #sortComponent = null;
  #EmptyListComponent = new EmptyView();

  #pointPresenters = new Map();

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
    this.#sourcedPoints = [...this.#pointsModel.points];
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
    this.#points = updateItem(this.#points, updatedPoint);
    this.#sourcedPoints = updateItem(this.#sourcedPoints, updatedPoint);
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

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.TIME_DOWN:
        this.#points.sort(calculateDateRangeDifference);
        break;
      case SortType.PRICE_DOWN:
        this.#points.sort(comparePointPrice);
        break;
      default:
        this.#points = [...this.#sourcedPoints];
    }
    this.#currentSortType = sortType;
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
    this.#sortPoints(sortType);

    this.#clearPointList();
    this.#renderTripPoint();
  };
}


