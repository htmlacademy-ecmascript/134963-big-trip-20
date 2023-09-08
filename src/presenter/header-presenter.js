import TripInfoView from '../view/trip-info-view.js';
import NewTaskButtonView from '../view/new-task-button-view.js';
import { render, RenderPosition } from '../framework/render';


export default class HeaderPresenter {
  #headerContainer = null;


  constructor ({headerContainer}) {
    this.#headerContainer = headerContainer;

  }

  init() {
    this.#renderNewTaskButtonView();
    this.#renderTripInfoView();


  }

  #renderTripInfoView() {
    render(new TripInfoView(), this.#headerContainer, RenderPosition.AFTERBEGIN);
  }

  #renderNewTaskButtonView() {
    render(new NewTaskButtonView(),this.#headerContainer);
  }

}
