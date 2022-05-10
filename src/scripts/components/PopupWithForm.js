import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._form = this._popupElement.querySelector(".form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._form.querySelectorAll(".form__input");
    this._submitButton = this._form.querySelector(".form__button");
    this._buttonText = this._submitButton.textContent;
  }
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
      //this.close();
    });
  }

  close() {
    this._form.reset();
    super.close();
  }
  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Saving ...";
    } else {
      this._submitButton.textContent = this._buttonText;
    }
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      // here you insert the `value` by the `name` of the input
      input.value = data[input.name];
    });
  }
}
