import Observable from '../framework/observable.js';
import {FilterType} from '../const.js';

export default class FilterModel extends Observable {
  #filters = FilterType.EVERYTHING;

  get filters() {
    return this.#filters;
  }

  setFilters(updateType, filter) {
    this.#filters = filter;
    this._notify(updateType, filter);
  }
}
