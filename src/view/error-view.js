import AbstractView from '../framework/view/abstract-view';

const createErrorTemplate = () => (
  '<p class="trip-events__msg">Strange, but someone turned off the light. Please refresh the page after some time.</p>'
);

export default class ErrorView extends AbstractView {
  get template() {
    return createErrorTemplate();
  }
}
