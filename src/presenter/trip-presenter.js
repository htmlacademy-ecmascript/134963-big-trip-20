import TripPointView from '../view/trip-point.js';
import TripPointsList from '../view/trip-point-list.js';
import FormEditTemplate from '../view/form-edit-view.js';
import SortView from '../view/sort-view.js';
import { render } from '../render.js';

export default class TripPresenter {
  tripComponent = new TripPointsList();
  sortComponent = new SortView();

  constructor({tripContainer, pointModel}) {
    this.tripContainer = tripContainer;
    this.pointModel = pointModel;
  }

  init() {
    this.tripPoints = [...this.pointModel.getPoints()];

    render(this.sortComponent, this.tripContainer);
    render(this.tripComponent, this.tripContainer);
    render (new FormEditTemplate(), this.tripComponent.getElement());

    for (let i = 0; i < this.tripPoints.length; i++) {
      render(new TripPointView(this.tripPoints[i]), this.tripComponent.getElement());
    }
  }
}
