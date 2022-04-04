const formValidationSettings = {

  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error-text_active"
};
export default class FormValidator {
  constructor(settings, formElement){

  this._inputSelector = settings._inputSelector;
  this._submitButtonSelector = settings.submitButtonSelector;
  this._inactiveButtonClass = settings.inactiveButtonClass;
  this._inputErrorClass = settings.inputErrorClass;
  this._errorClass = settings.errorClass;
  this._formElement = formElement;
  }
  _showInputError(element, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${element.id}-input-error`);
    errorElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };
  _hideInputError (element) {
    const errorElement = this._formElement.querySelector(`.${element.id}-input-error`);
    errorElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  };

  _hasInvalidInput (inputList) {
    // iterate over the array using the some() method
    return [... inputList].some((element) => !element.validity.valid);
      // If the field is invalid, the callback will return true.
      // The method will then stop, and hasInvalidInput() function will return true
      // hasInvalidInput returns true
    };


    _toggleInputError (form,element,settings) {
       if (!element.validity.valid) {
        // If NOT (!), show the error element
        showInputError(form,element, element.validationMessage,settings);
      } else {
        // If it's valid, hide the error element
        hideInputError(form, element,settings);
      }
    };


    // The function takes an array of input fields
    // and the button element, whose state you need to change

    _toggleButtonState () {
      // If there is at least one invalid input

      if (this._hasInvalidInput()) {
        // make the button inactive ?this._element
        element.classList.add(this._inactiveButtonClass);
        element.disabled = true;
      } else {
        // otherwise, make it active
        element.classList.remove(this._inactiveButtonClass);
        element.disabled = false;
      };
    };

    _setEventListeners (settings) {
      // Find all fields inside the form, and
     // make an array from them using the Array.from() method
     const inputList =[...this._formElement.querySelectorAll(this._inputSelector)];
     const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
       inputList.forEach((inputElement) => {
       inputElement.addEventListener("input",() =>{
         // Call the toggleInputError() function inside the callback,
         // and pass the form and the element to be checked to it
         toggleInputError(form,inputElement,settings);
         toggleButtonState({
           form: inputList,
           element: buttonElement,
           settings,
         });
       });
     });
    };

    enableValidation () {

      this._formElement.addEventListener("submit", (evt) => {
         evt.preventDefault();
       });
       this._setEventListeners();

    };
    resetValidation() {
      const formInputElements = this._formElement.querySelectorAll(this._inputSelector);
      const formButton = this._formElement.querySelector(this._submitButtonSelector);

      formInputElements.forEach((element) => {
        this._hideInputError(element,settings);
      });

      toggleButtonState({
        form: formInputElements,
        element: formButton,
        settings,
      });
    }

}

