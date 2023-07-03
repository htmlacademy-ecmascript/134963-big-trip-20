import TripPointView from '../view/trip-point.js';
import TripPointsList from '../view/trip-point-list.js';
import NewPointView from '../view/new-point-view.js';
import SortView from '../view/sort-view.js';
import { render } from '../render.js';

export default class TripPresenter {
  tripComponent = new TripPointsList();
  sortComponent = new SortView();

  constructor({tripContainer}) {
    this.tripContainer = tripContainer;
  }

  init() {
    render(this.sortComponent, this.tripContainer);
    render(this.tripComponent, this.tripContainer);
    render (new NewPointView(), this.tripComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new TripPointView(), this.tripComponent.getElement());
    }
  }
}
