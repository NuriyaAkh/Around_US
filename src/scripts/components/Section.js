export default class Section {
  constructor({ items, renderer , containerSelector}) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  renderItems() {
    this._items.forEach(item => {
      this._renderer(item);

    });
  }
  addItem(element) {
    this._container.prepend(element);

   }

//  addItem(item) {
//   const card = this._renderer(item)
//   this._container.prepend(card);
// }

}
