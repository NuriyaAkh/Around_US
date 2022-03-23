// function show input error
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
  inputElement.classList.add(settings.inputErrorClass);
  //console.log(`.${inputElement.id}-input-error`); //checking
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
};
//hide input error
const hideInputError = (formElement, inputElement,settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
  inputElement.classList.remove(settings.inputErrorClass);
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
 inputList.some((inputElement) => !inputElement.validity.valid);
    // If the field is invalid, the callback will return true.
    // The method will then stop, and hasInvalidInput() function will return true
    // hasInvalidInput returns true
};
// The function takes an array of input fields
// and the button element, whose state you need to change

const toggleButtonState = (inputList, buttonElement,settings) => {
 // console.log(hasInvalidInput(inputList));
 // If there is at least one invalid input

  if (hasInvalidInput(inputList)) {
    // make the button inactive
   buttonElement.classList.add(settings.inactiveButtonClass);
   buttonElement.disabled = true;
  } else {
    // otherwise, make it active
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.disabled = false;
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
     toggleButtonState(inputList, buttonElement,settings);

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
enableValidation({
  formSelector: ".forms",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error-text_active"
});
///to do the function does not work
  export function resetValidation(popup){
   const popupForm = popup.querySelector(".form");
   const popupInputElements = [...popup.querySelectorAll(".form__input")];
   const popupButton = popup.querySelector(".form__button");
   popupInputElements.forEach((popupInputElement) => {
     hideInputError(popupInputElement,popupForm);
   });

     toggleButtonState(popupInputElements, popupButton);
 }

