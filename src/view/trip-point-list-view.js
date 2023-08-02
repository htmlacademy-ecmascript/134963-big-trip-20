import { createElement } from '../render.js';

const createTripPointsList = () => '<ul class="trip-events__list"></ul>';

export default class TripPointsListView {
  getTemplate() {
    return createTripPointsList();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
