export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleMouseDown = this._handleMouseDown.bind(this);
  }

  open() {
    this._popupElement.classList.add("forms_is-open");
  }
  close() {
    this._popupElement.classList.remove("forms_is-open");
    document.removeEventListener("keydown", this._handleEscClose);
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
    if (evt.key === "Escape") {
      this.close();
    }
  }
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
