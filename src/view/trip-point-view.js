import AbstractView from '../framework/view/abstract-view.js';
import { DATE_FORMAT } from '../const.js';
import
{
  humanizeTripDueDate,
  dateDiff
} from '../utils/utils.js';


const createViewOffersList = (offers) => {
  const offersList = offers.offers.map((offer) =>
    `<li class="event__offer">
            <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.price}</span>
      </li>`).join('');
  return `<ul class="event__selected-offers">${offersList}</ul>`;
};

const createTripPoint = ({ point, pointDestination, pointOffer }) => {
  const { dateFrom, dateTo, type, basePrice, isFavorite } = point;

  const timeDuration = dateDiff(dateTo, dateFrom);
  const favoriteClassName = isFavorite
    ? 'event__favorite-btn event__favorite-btn--active'
    : 'event__favorite-btn';

  return (
    `<li class="trip-events__item">
        <div class="event">
          <time class="event__date" datetime=${humanizeTripDueDate(dateFrom, DATE_FORMAT.YEAR_MONTH_DAY_TIME)}>${humanizeTripDueDate(dateFrom, DATE_FORMAT.MONTH_DAY)}</time>
          <div class="event__type">
            <img 
              class="event__type-icon" 
              width="42" height="42" 
              src="img/icons/${type}.png" 
              alt="Event type icon">
          </div>
          <h3 class="event__title">${type} ${pointDestination.name}</h3>
          <div class="event__schedule">
            <p class="event__time">
              <time class="event__start-time" datetime=${humanizeTripDueDate(dateFrom, DATE_FORMAT.YEAR_MONTH_DAY_TIME)}>${humanizeTripDueDate(dateFrom,DATE_FORMAT.HOUR_MINUTES)}</time>
              &mdash;
              <time class="event__end-time" datetime=${humanizeTripDueDate(dateTo, DATE_FORMAT.YEAR_MONTH_DAY_TIME)}>${humanizeTripDueDate(dateTo, DATE_FORMAT.HOUR_MINUTES)}</time>
            </p>
            <p class="event__duration">${timeDuration}</p>
          </div>
          <p class="event__price">
            &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
          </p>
          <h4 class="visually-hidden">Offers:</h4>
          <ul class="event__selected-offers">
            <li class="event__offer">
          ${createViewOffersList(pointOffer)}
                     </ul>
          <button class="${favoriteClassName}" type="button">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
          </button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </div>
      </li>`
  );
};

export default class TripPointView extends AbstractView {
  #point = null;
  #pointDestination = null;
  #pointOffer = null;
  #handleFormClick = null;
  #handleFavoriteClick = null;

  constructor({ point, pointDestination, pointOffer, onEditClick, onFavoriteClick }) {
    super();
    this.#point = point;
    this.#pointDestination = pointDestination;
    this.#pointOffer = pointOffer;
    this.#handleFormClick = onEditClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickFormHandler);
    this.favoriteButton = this.element.querySelector('.event__favorite-btn');
    this.favoriteButton.addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createTripPoint({
      point: this.#point,
      pointDestination: this.#pointDestination,
      pointOffer: this.#pointOffer
    });
  }

  #clickFormHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };
}
