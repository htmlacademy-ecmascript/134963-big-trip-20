import AbstractView from '../framework/view/abstract-view.js';
import { humanizeTripDueDate } from '../utils/utils.js';
import { DATE_FORMAT } from '../const.js';

const createTripInfo = (points) =>{
  const startPoint = points[0];
  const endPoint = points[points.length - 1];
  const middlePoint = (points.length > 3) ? '...' : points[1].destination;
  const startPointDate = humanizeTripDueDate(startPoint.dateFrom, DATE_FORMAT.MONTH_DAY);
  const endPointDate = humanizeTripDueDate(endPoint.dateFrom, DATE_FORMAT.MONTH_DAY);

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${startPoint.destination} &mdash; ${middlePoint} &mdash; ${endPoint.destination}</h1>
        <p class="trip-info__dates">${startPointDate}&nbsp;&mdash;&nbsp;${endPointDate}</p>
      </div>
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">123123</span>
      </p>
    </section>`
  );
};

export default class TripInfoView extends AbstractView {
  #points = null;


  constructor({points }) {
    super();
    this.#points = points;

    console.log(this.#points);
  }

  get template() {
    return createTripInfo(this.#points);
  }
}
