import TripPointView from '../view/trip-point-view.js';
import TripPointsListView from '../view/trip-point-list-view.js';
import FormCreateView from '../view/form-create-view.js';
import SortView from '../view/sort-view.js';
import { render } from '../render.js';

export default class TripPresenter {
  tripComponent = new TripPointsListView();
  sortComponent = new SortView();

  constructor({ tripContainer, pointsModel, offersModel, destinationsModel }) {
    this.tripContainer = tripContainer;
    this.pointsModel = pointsModel;
    this.offersModel = offersModel;
    this.destinationsModel = destinationsModel;

    this.points = [...this.pointsModel.get()];
  }

  init() {
    render(this.sortComponent, this.tripContainer);
    render(this.tripComponent, this.tripContainer);

    render(
      new FormCreateView({
        point: this.points[0],
        pointDestination: this.destinationsModel.get(),
        pointOffer: this.offersModel.get()
      }),
      this.tripComponent.getElement()
    );

    this.points.forEach((point) => {
      render(
        new TripPointView({
          point,
          pointDestination: this.destinationsModel.getById(point.destination),
          pointOffer: this.offersModel.getByType(point.type)
        }),
        this.tripComponent.getElement()
      );
    });
  }
}
