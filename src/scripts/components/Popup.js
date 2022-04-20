export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleMouseDown = this._handleMouseDown.bind(this);
  }

  open() {
    this._popupElement.classList.add("forms_is-open");
    document.addEventListener("keydown", this._handleKeyEsc);
    document.addEventListener("mousedown", this._handleMouseDown);
  }
  close() {
    this._popupElement.classList.remove("forms_is-open");
    document.removeEventListener("keydown", this._handleKeyEsc);
    document.removeEventListener("mousedown", this._handleMouseDown);
  }

  _handleMouseDown(evt) {
    if (
      evt.target.classList.contains("forms") ||
      evt.target.classList.contains("forms__button-close")
    ) {
      this.close();
    }
  }
  _handleEscClose(evt) {
    evt.preventDefault();
    if (evt.key === "Escape") {
      this.close();
    }
  }

  //that adds a click event listener to the close icon of the popup. The modal window should also close when users click on the shaded area around the form
  setEventListeners() {
    this._popupElement
      .querySelector(".forms__button-close")
      .addEventListener("click", () => {
        this.close();
      });
    document.addEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });
    document.addEventListener("mousedown", (evt) => {
      this._handleMouseDown(evt);
    });
  }
}
