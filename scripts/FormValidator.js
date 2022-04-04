export default class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings._inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._formElement = formElement;
  }
  _showInputError(element, errorMessage) {
    const errorElement =
        this._formElement.querySelector(`.${element.id}-input-error`);
   element.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };
  _hideInputError(element) {
    const errorElement =
        this._formElement.querySelector(`.${element.id}-input-error`);
    element.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _hasInvalidInput() {
    return [...this._inputList].some((element) => !element.validity.valid);
  };


  _toggleInputError(element) {
    if (!element.validity.valid) {

      this._showInputError(element, element.validationMessage);
    } else {

      this._hideInputError(element);
    }
  };

  _toggleButtonState() {
    // If there is at least one invalid input

    if (this._hasInvalidInput()) {
      // make the button inactive
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      // otherwise, make it active
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    };
  };

  _setEventListeners() {
        this._inputList =
        [...this._formElement.querySelectorAll(this._inputSelector)];
    this._buttonElement =
        this._formElement.querySelector(this._submitButtonSelector);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._toggleInputError(inputElement);
        this._toggleButtonState();
      });
    });
  };

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  };
  resetValidation() {
    this._formInputElements =
        this._formElement.querySelectorAll(this._inputSelector);
    this._formButton =
        this._formElement.querySelector(this._submitButtonSelector);

    this._formInputElements.forEach((element) => {
      this._hideInputError(element);
    });

    this._toggleButtonState();
  }
}
