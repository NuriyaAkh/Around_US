const settings = {
  formSelector: ".forms",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error-text_active"
};

// function show input error
const showInputError = (form, element, errorMessage) => {
  const errorElement = form.querySelector(`.${element.id}-input-error`);
  errorElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
};

//hide input error
const hideInputError = (form, element, settings) => {
  const errorElement = form.querySelector(`.${element.id}-input-error`);
  errorElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = "";
};
const toggleInputError = (formElement,inputElement,settings) => {
  if (!inputElement.validity.valid) {
    // If NOT (!), show the error element
    showInputError(formElement,inputElement, inputElement.validationMessage,settings);
  } else {
    // If it's valid, hide the error element
    hideInputError(formElement, inputElement,settings);
  }
};

const hasInvalidInput = (inputList) => {
// iterate over the array using the some() method
return [...inputList].some((inputElement) => !inputElement.validity.valid);
  // If the field is invalid, the callback will return true.
  // The method will then stop, and hasInvalidInput() function will return true
  // hasInvalidInput returns true
};
// The function takes an array of input fields
// and the button element, whose state you need to change

const toggleButtonState = ({ form, element, settings }) => {
  // If there is at least one invalid input

  if (hasInvalidInput(form)) {
    // make the button inactive
    element.classList.add(settings.inactiveButtonClass);
    element.disabled = true;
  } else {
    // otherwise, make it active
    element.classList.remove(settings.inactiveButtonClass);
    element.disabled = false;
  };
};

const setEventListeners = (formElement,settings) =>{
  // Find all fields inside the form, and
 // make an array from them using the Array.from() method
 const inputList =[...formElement.querySelectorAll(settings.inputSelector)];
   //console.log(formElement);
 const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  // Call the toggleButtonState()
 inputList.forEach((inputElement) => {
   inputElement.addEventListener("input",() =>{
     // Call the toggleInputError() function inside the callback,
     // and pass the form and the element to be checked to it
     toggleInputError(formElement,inputElement,settings);
     toggleButtonState({
       form: inputList,
       element: buttonElement,
       settings,
     });
   });
 });
};
//setting can have any name
const enableValidation = (settings) =>{
  // It will find all forms with the specified class in DOM, and
  // make an array from them using the Array.from() method
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
 // Iterate over the resulting array
 formList.forEach((formElement) => {
  formElement.addEventListener("submit", (evt) => {
     evt.preventDefault();
   });
   setEventListeners(formElement,settings);
 });
};

enableValidation(settings);

export function resetValidation(form) {
  const formInputElements = form.querySelectorAll(settings.inputSelector);
  const formButton = form.querySelector(settings.submitButtonSelector);

  formInputElements.forEach((element) => {
    hideInputError(form,element,settings);
  });

  toggleButtonState({
    form: formInputElements,
    element: formButton,
    settings,
  });
}

