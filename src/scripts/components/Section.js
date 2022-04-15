import Card from "./Card";
export default class Section {
  constructor({ data }, cardSelector) {
    this._renderedCards = data;
    this._container = document.querySelector(cardSelector);
  }
  renderer() {
    this._renderedCards.forEach((item) => {
      const card = new Cards(item, "#card").generateCard(); // pass an object as an argument
      // Fill up the card and return it
      // Add it to the DOM
      this.addItem(cardElement);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
