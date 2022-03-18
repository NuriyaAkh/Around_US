// enabling validation by calling enableValidation()
// pass all the settings on call




 const formSelector = document.querySelector(".forms");
 const inputSelector = document.querySelector(".form__input");

// prefent default
 formSelector.addEventListener("submit", function (evt) {
  evt.preventDefault();
});
// input event handler
formInput.addEventListener("input", function (evt) {


});

// function show input error
const showInputError = (formSelector,inputSelector,errorMessage, settings) => {
  const formError = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.add(settings.inputErrorClass);
  formError.textContent = errorMessage;
  formError.classList.add(settings.errorClass);

};
//hide input error
const hideInputError = (formSelector,inputSelector,settings) => {
  const formError = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.remove(settings.inputErrorClass);
  formError.classList.remove(settings.errorClass);
  formError.textContent="";
};
const isValid = (formSelector,inputSelector) => {
  if (!inputSelector.validity.valid) {
    // If NOT (!), show the error element
    showInputError(formSelector,inputSelector, inputSelector.validationMessage);
  } else {
    // If it's valid, hide the error element
    hideInputError(formSelector, inputSelector);
  }
};
// Call the isValid() function for each character input
inputSelector.addEventListener("input", isValid);

const setEventListeners = (formSelector, settings) =>{
   // Find all fields inside the form, and
  // make an array from them using the Array.from() method
  const inputList = Array.from(formSelector.querySelectorAll(".form__input"));
  inputList.forEach((inputSelector) => {
    inputSelector.addEventListener("input",() =>{
      // Call the isValid() function inside the callback,
      // and pass the form and the element to be checked to it
      isValid(formSelector,inputSelector)
    });
  });
};
const enableValidation = (settings) => {
  // It will find all forms with the specified class in DOM, and
  // make an array from them using the Array.from() method
  const formList = Array.from(document.querySelectorAll(".form"));
 // Iterate over the resulting array
 formList.forEach((formSelector) => {
   formSelector.addEventListener("submit", (evt) => {
     evt.preventDefault();
   });
   setEventListeners(formSelector,settings);
 });
};

enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",//to do
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error-text_active"
});
enableValidation();
