import AbstractView from '../framework/view/abstract-view.js';
import { humanizeTripDueDate } from '../utils/utils.js';
import { POINT_EMPTY, DATE_FORMAT } from '../const.js';
import {capitalizeFirstLetter} from '../utils/common.js';

const createViewDestinationPhoto = (photos) => {
  const photoList = photos.map((photo) => (
    `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`)).join('');

  return `<div class="event__photos-tape">${photoList}</div>`;
};

const createOffersListTemplate = (offers) => offers.map((currentOffer) => {
  const isChecked = !offers.includes(currentOffer.id);
  const checked = isChecked ? 'checked' : '';

  return (
    `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-mockid-${currentOffer.id}" type="checkbox" name="event-offer-mockid-${currentOffer.id}" ${checked}>
        <label class="event__offer-label" for="event-offer-mockid-${currentOffer.id}">
          <span class="event__offer-title">${currentOffer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${currentOffer.price}</span>
        </label>
       </div>`
  );
}).join('');

const createTypesListTemplate = (offerTypes, type) => {
  const offerType = (offerTypes.length === 0) ? '' :
    offerTypes.map((item) => (
      `<div class="event__type-item">
      <input
        id="event-type-${item.type}-1" 
        class="event__type-input  visually-hidden" 
        type="radio" 
        name="event-type" 
        value="${item.type}"
        ${(item.type === type) ? 'checked' : ''}
      >
      <label class="event__type-label  event__type-label--${item.type}" for="event-type-${item.type}-1">${capitalizeFirstLetter(item.type)}</label>
     </div>`)).join('');

  return (
    `<div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
              ${offerType}
        </div>
     </div>`);
};

const createFormTemplate = ({ point = POINT_EMPTY, pointDestination, pointOffer }) => {
  const { dateFrom, dateTo, type, basePrice } = point;
  const offersByType = pointOffer.find((item) => item.type === type).offers;
  const currentDestination = pointDestination.find((destination) => destination.id === point.destination);

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
        ${createTypesListTemplate(pointOffer, type)}    
          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input
              class="event__input event__input--destination" 
              id="event-destination-1" 
              type="text" 
              name="event-destination" 
              value="${currentDestination.name}" 
              list="destination-list-1"
            >
            <datalist id="destination-list-1">
              <option value="Paris"></option>
              <option value="Geneva"></option>
              <option value="Chamonix"></option>
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input
              class="event__input  event__input--time"
              id="event-start-time-1" 
              type="text" 
              name="event-start-time" 
              value="${humanizeTripDueDate(dateFrom, DATE_FORMAT.DAY_MONTH_YEAR_TIME_SLASHED)}"
            >
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input
              class="event__input  event__input--time"
              id="event-end-time-1" 
              type="text"
              name="event-end-time"
              value="${humanizeTripDueDate(dateTo, DATE_FORMAT.DAY_MONTH_YEAR_TIME_SLASHED)}"
            >
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input 
              class="event__input  event__input--price" 
              id="event-price-1" 
              type="text" 
              name="event-price" 
              value="${basePrice}"
            >
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Cancel</button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${createOffersListTemplate(offersByType)}
          </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${currentDestination.description}</p>

            <div class="event__photos-container">
              ${createViewDestinationPhoto(currentDestination.pictures)}
            </div>     
          </section>
        </section>
      </form>
    </li>`
  );
};

export default class FormCreateView extends AbstractView{
  #point = null;
  #pointDestination = null;
  #pointOffer = null;
  #handleFormSubmit = null;
  #handleToggleClick = null;
  #handleDeleteClick = null;


  constructor({ point = POINT_EMPTY, pointDestination, pointOffer, onFormSubmit, onDeleteClick}) {
    super();
    this.#point = point;
    this.#pointDestination = pointDestination;
    this.#pointOffer = pointOffer;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleDeleteClick = onDeleteClick;

    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteClickHandler);

  }

  get template() {
    return createFormTemplate({
      point: this.#point,
      pointDestination: this.#pointDestination,
      pointOffer: this.#pointOffer
    });
  }


  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit();
  };

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick();
  };
}

