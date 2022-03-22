// function show input error
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
  inputElement.classList.add("form__input_type_error");
  //console.log(`.${inputElement.id}-input-error`); //checking
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__error-text_active");
};
//hide input error
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
  inputElement.classList.remove("form__input_type_error");
  errorElement.classList.remove("form__error-text_active");
  errorElement.textContent = "";
};
const toggleInputError = (formElement,inputElement) => {
  if (!inputElement.validity.valid) {
    // If NOT (!), show the error element
    showInputError(formElement,inputElement, inputElement.validationMessage);
  } else {
    // If it's valid, hide the error element
    hideInputError(formElement, inputElement);
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

const toggleButtonState = (inputList, buttonElement) => {
 // console.log(hasInvalidInput(inputList));
 // If there is at least one invalid input

  if (hasInvalidInput(inputList)) {
    // make the button inactive
   buttonElement.classList.add("form__button_disabled");
   buttonElement.disabled = true;
  } else {
    // otherwise, make it active
    buttonElement.classList.remove("form__button_disabled");
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
     toggleInputError(formElement,inputElement);
     toggleButtonState(inputList, buttonElement);

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
  inactiveButtonClass: ".form__button_disabled",
  inputErrorClass: ".form__input_type_error",
  errorClass: ".form__error-text_active"
});
  export function resetValidation(popup){
   const popupInputElements= Array.from(document.querySelectorAll(".form__input"));
   const popupForm = document.querySelector(".form");
   const popupButton = document.querySelector(".form__button");
   popupInputElements.forEach((popupElement) =>{
     hideInputError(popupForm, popupElement)});
  toggleButtonState(popupInputElements, popupButton );
 }

