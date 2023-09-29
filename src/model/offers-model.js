export default class OffersModel {
  #service = null;
  #offers = [];

  constructor(service) {
    this.#service = service;
  }

  async init() {
    try {
      this.#offers = await this.#service.getOffers();
    } catch (err) {
      this.#offers = [];
    }
  }

  get offers() {
    return this.#offers;
  }

  getByType(type) {
    return this.#offers
      .find((offer) => offer.type === type);
  }
}
