import he from 'he';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { humanizeTripDueDate } from '../utils/utils.js';
import { DATE_FORMAT, POINT_EMPTY } from '../const.js';
import { capitalizeFirstLetter } from '../utils/common.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const createViewDestinationPhoto = (destinationPicture, destinationDescription) => {
  const photoList = (destinationPicture.length === 0) ? ' ' : destinationPicture.map((photo) => (
    `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`)).join('');

  if (destinationPicture.length === 0) {
    return '';
  } return (
    `<section class="event__section  event__section--destination">
     <h3 class="event__section-title  event__section-title--destination">Destination</h3>
     <p class="event__destination-description">${he.encode(destinationDescription)}</p>

     <div class="event__photos-container">
      <div class="event__photos-tape">
       ${photoList}
      </div>
     </div>     
    </section>`
  );
};

const createDatalist = (pointDestinations) => {
  const dataList = pointDestinations.map((pointDestination) =>
    `<option value="${pointDestination.name}"></option>`).join('');
  return (
    `<datalist id="destination-list-1">${dataList}</datalist>`
  );
};

const createOffersListTemplate = (offersByType, offers) => offersByType.map((currentOffer) => (
  `<div class="event__offer-selector">
      <input class="event__offer-checkbox  
        visually-hidden" 
        id="event-offer-mockid-${currentOffer.id}"
        data-offer-id="${currentOffer.id}" 
        type="checkbox" 
        name="event-offer-mockid-${currentOffer.id}" 
        ${offers.some((selectedOption) => selectedOption === currentOffer.id) ? 'checked' : ''}>
      <label class="event__offer-label" for="event-offer-mockid-${currentOffer.id}">
        <span class="event__offer-title">${he.encode(currentOffer.title)}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${currentOffer.price}</span>
      </label>
      </div>`
)).join('');

const createOffersList = (offersByType, offers) => {
  if (offersByType.length === 0) {
    return '';
  }
  return (
    ` <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${createOffersListTemplate(offersByType, offers)}
      </div>
  </section>`
  );
};

const createTypesListTemplate = (offerTypes, type, isDisabled) => {
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
        ${isDisabled ? 'disabled' : ''}
      >
      <label class="event__type-label  event__type-label--${item.type}" for="event-type-${item.type}-1">${capitalizeFirstLetter(item.type)}</label>
     </div>`)).join('');

  return (
    `<div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input 
         class="event__type-toggle
         visually-hidden"
         id="event-type-toggle-1"
         type="checkbox"
         ${isDisabled ? 'disabled' : ''}
        >
        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
              ${offerType}
        </div>
     </div>`);
};

const createEventDetailsSection = (offersByType, offers, destinationPicture, destinationDescription) => {
  if (offersByType.length === 0 && destinationPicture.length === 0) {
    return '';
  }
  return (
    `<section class="event__details">
        ${createOffersList(offersByType, offers)}
        ${createViewDestinationPhoto(destinationPicture, destinationDescription)}
      </section>`
  );
};

function createToggleButton(isEditMode) {
  if (isEditMode) {
    return '';
  } else {
    return `<button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
      </button>`;
  }
}

function createDeletingButtonText(isEditMode, isDeleting) {
  if (isEditMode) {
    return 'Cancel';
  } else if (isDeleting) {
    return 'Deleting...';
  } else {
    return 'Delete';
  }
}


const createFormTemplate = ({ point, pointDestinations, pointOffers, isEditMode }) => {
  const { dateFrom, dateTo, type, basePrice, destination, offers, isDeleting, isSaving, isDisabled } = point;
  const offersByType = pointOffers.find((item) => item.type === type).offers;
  const destinationDescription = (pointDestinations.length > 0 && destination !== null) ? pointDestinations.find((waypoint) => waypoint.id === destination).description : '';
  const destinationName = (pointDestinations.length > 0 && destination !== null) ? pointDestinations.find((waypoint) => waypoint.id === destination).name : '';
  const destinationPicture = (pointDestinations.length > 0 && destination !== null) ? pointDestinations.find((waypoint) => waypoint.id === destination).pictures : [];
  const destinationList = createDatalist(pointDestinations);
  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
        ${createTypesListTemplate(pointOffers, type, isDisabled)}    
          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input
              class="event__input event__input--destination" 
              id="event-destination-1" 
              type="text" 
              name="event-destination" 
              value="${he.encode(destinationName)}" 
              list="destination-list-1"
              ${isDisabled ? 'disabled' : ''}
            >
            ${destinationList}
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input
              class="event__input  event__input--time"
              id="event-start-time-1" 
              type="text" 
              name="event-start-time" 
              value="${humanizeTripDueDate(dateFrom, DATE_FORMAT.DAY_MONTH_YEAR_TIME_SLASHED)}"
              ${isDisabled ? 'disabled' : ''}
            >
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input
              class="event__input  event__input--time"
              id="event-end-time-1" 
              type="text"
              name="event-end-time"
              ${isDisabled ? 'disabled' : ''}
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
              ${isDisabled ? 'disabled' : ''}
            >
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
          <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${createDeletingButtonText(isEditMode, isDeleting)}</button>
          ${createToggleButton(isEditMode)}
        </header>
        ${createEventDetailsSection(offersByType, offers, destinationPicture, destinationDescription)}
      </form>
    </li>`
  );
};

export default class FormView extends AbstractStatefulView {
  _state = null;
  #pointDestinations = null;
  #pointOffers = null;
  #handleFormSubmit = null;
  #handleDeleteClick = null;
  #handleToggleClick = null;
  #isEditMode = null;

  #datePickerFrom = null;
  #datePickerTo = null;


  constructor({ point = POINT_EMPTY,
    pointDestinations,
    pointOffers,
    onFormSubmit,
    onDeleteClick,
    onToggleClick,
    isEditMode
  }) {
    super();
    this.#pointDestinations = pointDestinations;
    this.#pointOffers = pointOffers;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleDeleteClick = onDeleteClick;
    this.#handleToggleClick = onToggleClick;
    this.#isEditMode = isEditMode;

    this._setState(FormView.parsePointToState(point));

    this.#setInnerHandlers();
  }

  get template() {
    return createFormTemplate({
      point: this._state,
      pointDestinations: this.#pointDestinations,
      pointOffers: this.#pointOffers,
      isEditMode: this.#isEditMode
    });
  }

  removeElement() {
    super.removeElement();

    if (this.#datePickerFrom) {
      this.#datePickerFrom.destroy();
      this.#datePickerFrom = null;
    }

    if (this.#datePickerTo) {
      this.#datePickerTo.destroy();
      this.#datePickerTo = null;
    }
  }

  reset(point) {
    this.updateElement(
      FormView.parsePointToState(point),
    );
  }

  #setInnerHandlers() {
    this.element
      .querySelector('form').addEventListener('submit', this.#formSubmitHandler);

    this.element
      .querySelector('.event__reset-btn').addEventListener('click', this.#deleteClickHandler);

    if (this.element.querySelector('.event__rollup-btn')) {
      this.element
        .querySelector('.event__rollup-btn').addEventListener('click', this.#toggleClickHandler);
    }

    this.element
      .querySelector('.event__type-group').addEventListener('change', this.#typeInputChange);

    this.element
      .querySelector('.event__input--price').addEventListener('input', this.#priceInputChange);

    this.element
      .querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);

    // Если падает ошибка, что контейнер отсутствует в разметке, ставится заглушка на обработчик
    const offersContainer = this.element.querySelector('.event__available-offers');

    if (offersContainer) {
      offersContainer.addEventListener('change', this.#offerClickHandler);
    }

    this.#setDatepicker();

  }

  _restoreHandlers() {
    this.#setInnerHandlers();
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();

    const selectedDestination = this._state.destination;
    const newPrice = this._state.price;

    if (!selectedDestination || newPrice < 0) {
      return;
    }

    this.#handleFormSubmit(FormView.parseStateToPoint(this._state));
  };

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(FormView.parseStateToPoint(this._state));
  };

  #toggleClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleToggleClick();
  };

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };


  #typeInputChange = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offers: [],
    });
  };

  #priceInputChange = (evt) => {
    evt.preventDefault();

    const inputValue = parseFloat(evt.target.value);

    if (isNaN(inputValue) || inputValue <= 0) {
      return;
    }

    this._setState({
      basePrice: inputValue,
    });
  };

  #destinationChangeHandler = (evt) => {
    const selectedDestination = evt.target.value;
    const selectedDestinationObject = this.#pointDestinations.find((destination) => destination.name === selectedDestination);


    if (!selectedDestination || !selectedDestinationObject) {
      evt.target.value = '';
      return;
    }
    const selectedDestinationId = selectedDestinationObject.id;

    this.updateElement({ destination: selectedDestinationId });
  };

  #offerClickHandler = (evt) => {
    evt.preventDefault();
    const offerId = evt.target.dataset.offerId;
    const isChecked = evt.target.checked;

    const newOffers = new Set(this._state.offers);

    if (isChecked) {
      newOffers.add(offerId);
    } else {
      newOffers.delete(offerId);
    }

    this._setState({
      offers: Array.from(newOffers),
    });
  };

  #setDatepicker() {
    const dateFromInput = this.element.querySelector('#event-start-time-1');
    const dateToInput = this.element.querySelector('#event-end-time-1');

    this.#datePickerFrom = flatpickr(dateFromInput, {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      'time_24hr': true,
      maxDate: this._state.dateTo,
      onChange: this.#dateFromChangeHandler,
    });

    this.#datePickerTo = flatpickr(dateToInput, {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      'time_24hr': true,
      minDate: this._state.dateFrom,
      onChange: this.#dateToChangeHandler,
    });
  }

  static parsePointToState = (point) => ({
    ...point,
    isDisabled: false,
    isSaving: false,
    isDeleting: false,
  });

  static parseStateToPoint = (state) => {
    const point = {...state};

    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
  };
}

