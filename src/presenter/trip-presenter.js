import TripPointView from '../view/trip-point.js';
import TripPointsList from '../view/trip-point-list.js';
import FormEditTemplate from '../view/form-edit-view.js';
import SortView from '../view/sort-view.js';
import { render } from '../render.js';

export default class TripPresenter {
  tripComponent = new TripPointsList();
  sortComponent = new SortView();

  constructor({tripContainer, pointsModel, offersModel, destinationsModel}) {
    this.tripContainer = tripContainer;
    this.pointsModel = pointsModel;
    this.offersModel = offersModel;
    this.destinationsModel = destinationsModel;

    this.points = [...this.pointsModel.get()];
  }

  init() {
    render(this.sortComponent, this.tripContainer);
    render(this.tripComponent, this.tripContainer);

    render (
      new FormEditTemplate({
        point: this.points[0],
        pointDestinations: this.destinationsModel.get(),
        pointOffers: this.offersModel.get()
      }),
      this.tripComponent.getElement()
    );

    this.points.forEach((point) => {
      render (
        new TripPointView({
          point,
          pointDestinations: this.destinationsModel.getById(point.destination),
          pointOffers: this.offersModel.getByType(point.type)
        }),
        this.tripComponent.getElement()
      );
    });
  }
}
