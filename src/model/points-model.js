export default class PointsModel {

  constructor(service) {
    this.service = service;
    this.points = this.service.getPoints();
  }

  get() {
    return this.points;
  }
}


// const POINT_COUNT = 5;

// export default class PointsModel {
//   points = Array.from({length: POINT_COUNT}, getRandomPoints);

//   getPoints() {
//     return this.points;
//   }

//   getDestination() {
//     return this.destination;
//   }
// }
