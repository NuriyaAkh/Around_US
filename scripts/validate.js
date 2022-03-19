// enabling validation by calling enableValidation()
// pass all the settings on call




 //const formElement = document.querySelector(".forms");
 //const inputElement = formElement.querySelectorAll(".form__input");
 //const errorElement = formSelector.querySelector(`.${inputElement.id}-error`);
/* // prefent default
 formSelector.addEventListener("submit", function (evt) {
  evt.preventDefault();
});
// input event handler
inputSelector.addEventListener("input", function (evt) {


}); */

// function show input error
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("form__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__error-text_active");
};
//hide input error
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
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

const setEventListeners = (formElement) =>{
   // Find all fields inside the form, and
  // make an array from them using the Array.from() method
  const inputList = Array.from(formElement.querySelectorAll(".form__input"));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input",() =>{
      // Call the isValid() function inside the callback,
      // and pass the form and the element to be checked to it
      isValid(formElement,inputElement)
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

