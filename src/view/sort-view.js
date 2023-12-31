import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../const.js';

const createSortTemplate = (currentSortType) => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <div class="trip-sort__item  trip-sort__item--day">
        <input 
        id="sort-day" 
        class="trip-sort__input  
        visually-hidden" 
        type="radio" 
        name="trip-sort" 
        value="sort-day"
        data-sort-type="${SortType.DEFAULT}"
        ${currentSortType === SortType.DEFAULT ? 'checked' : ''}
        >
        <label class="trip-sort__btn" for="sort-day">Day</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--event">
        <input 
          id="sort-event" 
          class="trip-sort__input  visually-hidden" 
          type="radio"
          name="trip-sort" 
          value="sort-event" 
          disabled
        >
        <label class="trip-sort__btn" for="sort-event">Event</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--time">
        <input 
          id="sort-time" 
          class="trip-sort__input  visually-hidden" 
          type="radio" 
          name="trip-sort" 
          value="sort-time"
          data-sort-type="${SortType.TIME_DESC}"
          ${currentSortType === SortType.TIME_DESC ? 'checked' : ''}
        >
        <label class="trip-sort__btn" for="sort-time">Time</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--price">
        <input 
          id="sort-price" 
          class="trip-sort__input  visually-hidden" 
          type="radio" 
          name="trip-sort" 
          value="sort-price"
          data-sort-type="${SortType.PRICE_DESC}"
          ${currentSortType === SortType.PRICE_DESC ? 'checked' : ''}
        >
        <label class="trip-sort__btn" for="sort-price">Price</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--offer">
        <input 
          id="sort-offer" 
          class="trip-sort__input  visually-hidden" 
          type="radio" 
          name="trip-sort" 
          value="sort-offer" 
          disabled
        >
        <label class="trip-sort__btn" for="sort-offer">Offers</label>
      </div>
    </form>`
);

export default class SortView extends AbstractView {
  #handleSortTypeChange = null;
  #currentSortType = null;

  constructor({ onSortTypeChange, currentSortType }) {
    super();
    this.#currentSortType = currentSortType;
    this.#handleSortTypeChange = onSortTypeChange;
    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  #sortTypeChangeHandler = (evt) => {
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };

  get template() {
    return createSortTemplate(this.#currentSortType);
  }
}
