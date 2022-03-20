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
const isValid = (formElement,inputElement) => {
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
  return inputList.some((inputElement) => {
    // If the field is invalid, the callback will return true.
    // The method will then stop, and hasInvalidInput() function will return true
    // hasInvalidInput returns true

    return !inputElement.validity.valid;
  });
};
// The function takes an array of input fields
// and the button element, whose state you need to change

const toggleButtonState = (inputList, buttonElement) => {
 // console.log(hasInvalidInput(inputList));
 // If there is at least one invalid input

  if (hasInvalidInput(inputList)) {
    // make the button inactive
   buttonElement.classList.add("form__button_disabled");
   //buttonElement.setAttribute("disabled", "");
   buttonElement.disabled = true;
  } else {
    // otherwise, make it active
    buttonElement.classList.remove("form__button_disabled");
    //document.querySelector.removeAttribute("disabled","");
    buttonElement.disabled = false;
};
};

const setEventListeners = (formElement) =>{
  // Find all fields inside the form, and
 // make an array from them using the Array.from() method
 const inputList = Array.from(formElement.querySelectorAll(".form__input"));
 //console.log(formElement);
 const buttonElement = formElement.querySelector(".form__button");
  // Call the toggleButtonState()
  if (buttonElement) {
    toggleButtonState(inputList, buttonElement);
  }

 //console.log(buttonElement);

 inputList.forEach((inputElement) => {
   inputElement.addEventListener("input",() =>{
     // Call the isValid() function inside the callback,
     // and pass the form and the element to be checked to it
     isValid(formElement,inputElement);
     toggleButtonState(inputList, buttonElement);

   });
 });
};
const enableValidation = () =>{
  // It will find all forms with the specified class in DOM, and
  // make an array from them using the Array.from() method
  const formList = Array.from(document.querySelectorAll(".forms"));
 // Iterate over the resulting array
 formList.forEach((formElement) => {
  formElement.addEventListener("submit", (evt) => {
     evt.preventDefault();
   });
   setEventListeners(formElement);
 });
};

enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: ".form__button_disabled",//to do
  inputErrorClass: ".form__input_type_error",
  errorClass: ".form__error-text_active"
});
