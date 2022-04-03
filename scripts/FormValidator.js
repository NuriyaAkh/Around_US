const settings = {
  formSelector: ".forms",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error-text_active"
}; //setting can have any name
export default class FormValidator {
  constructor(settings, form){
  //this._formSelector = settings.formSelector;
  this._inputSelector = settings._inputSelector;
  this._submitButtonSelector = settings.submitButtonSelector;
  this._inactiveButtonClass = settings.inactiveButtonClass;
  this._inputErrorClass = settings.inputErrorClass;
  this._errorClass = settings.errorClass;
  this._form = form;
  }

  _hasInvalidInput (inputList) {
    // iterate over the array using the some() method
    return [... inputList].some((element) => !element.validity.valid);
      // If the field is invalid, the callback will return true.
      // The method will then stop, and hasInvalidInput() function will return true
      // hasInvalidInput returns true
    };

     _showInputError(form, element, errorMessage) {
      const errorElement = form.querySelector(`.${element.id}-input-error`);
      errorElement.classList.add(this._inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._errorClass);
    };

    //hide input error
    _hideInputError (form, element, settings) {
      const errorElement = form.querySelector(`.${element.id}-input-error`);
      errorElement.classList.remove(this._inputErrorClass);
      errorElement.classList.remove(this._errorClass);
      errorElement.textContent = "";
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

    _toggleButtonState ({ form, element, settings }) {
      // If there is at least one invalid input

      if (hasInvalidInput(form)) {
        // make the button inactive
        element.classList.add(this._inactiveButtonClass);
        element.disabled = true;
      } else {
        // otherwise, make it active
        element.classList.remove(this._inactiveButtonClass);
        element.disabled = false;
      };
    };

    _setEventListeners (form,settings) {
      // Find all fields inside the form, and
     // make an array from them using the Array.from() method
     const inputList =[...form.querySelectorAll(this._inputSelector)];
     const buttonElement = form.querySelector(this._submitButtonSelector);
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

    enableValidation (settings) {
      // It will find all forms with the specified class in DOM, and
      // make an array from them using the Array.from() method
      const formList = Array.from(document.querySelectorAll(this._form));
     // Iterate over the resulting array
     formList.forEach((formElement) => {
      formElement.addEventListener("submit", (evt) => {
         evt.preventDefault();
       });
       this._setEventListeners(formElement,settings);
     });
    };
    resetValidation(form) {
      const formInputElements = form.querySelectorAll(this._inputSelector);
      const formButton = form.querySelector(this._submitButtonSelector);

      formInputElements.forEach((element) => {
        hideInputError(form,element,settings);
      });

      toggleButtonState({
        form: formInputElements,
        element: formButton,
        settings,
      });
    }

}

