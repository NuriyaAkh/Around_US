import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._form = this._popupElement.querySelector(".form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._form.querySelectorAll(".form__input"); // Get all input field elements
  }
  //  collects data from all the input fields and returns that data as an object.
  _getInputValues() {
    // Create an empty object
    this._formValues = {};

    // Add the values of the fields to this object
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    // Return the values object
    return this._formValues;
  }

  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
    //super.setEventListeners();
  }

  close() {
    this._form.reset();
    super.close();
  }
}
