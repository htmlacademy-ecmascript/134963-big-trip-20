import TripInfoView from '../view/trip-info-view.js';
import { render, RenderPosition } from '../framework/render';


export default class HeaderPresenter {
  #headerContainer = null;


  constructor ({headerContainer}) {
    this.#headerContainer = headerContainer;

  }

  init() {
    this.#renderTripInfoView();


  }

  #renderTripInfoView() {
    render(new TripInfoView(), this.#headerContainer, RenderPosition.AFTERBEGIN);
  }

}
