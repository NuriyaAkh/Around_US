import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  //It takes two arguments: the popup selector, and a callback function which PopupWithForm calls when the form’s submit event fires.
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._form = document.querySelector(".form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._form.querySelectorAll(".form__input"); // Get all field elements
  }
  // which collects data from all the input fields and returns that data as an object.
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
  //It modifies the setEventListeners() parent method. The setEventListeners() method of the PopupWithForm class has to add the submit event handler to the form and the click event listener to the close icon.
  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      // Add a _handleFormSubmit() function call
      // Pass an object which is the result of the _getInputValues work to it
      this._handleFormSubmit(this._getInputValues());

      this._form.reset();
    });
    super.setEventListeners();
  }
  //It modifies the close() parent method in order to reset the form once the popup is closed.
  close() {
    this._form.reset();
    super.close();
  }
}