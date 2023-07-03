import NewTaskButtonView from '../view/new-task-button-view.js';
import TripPointView from '../view/trip-point.js';
import TripPointsList from '../view/trip-point-list.js';
import NewPointView from '../view/new-point-view.js';
import NewPointWithoutOffersView from '../view/new-point-without-offers-view.js';
import NewPointWithoutDestinationS from '../view/new-point-without-destination-view.js';
import SortView from '../view/sort-view.js';
import { render } from '../render.js';

export default class TripPresenter {
  tripComponent = new TripPointsList();
  sortComponent = new SortView();

  constructor({tripContainer}) {
    this.TripContainer = tripContainer;
  }

  init() {
    render(this.tripComponent, this.tripContainer);
    render(this.sortComponent, this.tripContainer);


    for (let i = 0; i < 3; i++) {
      render(new TripPointView(), this.tripComponent.getElement());
    }

    render(new NewTaskButtonView(), this.tripComponent.getElement());
  }
}
