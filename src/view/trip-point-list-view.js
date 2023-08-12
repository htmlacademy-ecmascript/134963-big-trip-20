import AbstractView from '../framework/view/abstract-view.js';

const createTripPointsList = () => '<ul class="trip-events__list"></ul>';

export default class TripPointsListView extends AbstractView {
  get template() {
    return createTripPointsList();
  }
}
