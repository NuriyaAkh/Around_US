// enabling validation by calling enableValidation()
// pass all the settings on call
const enableValidation = () => {
  // It will find all forms with the specified class in DOM, and
  // make an array from them using the Array.from() method
  const formList = Array.from(document.querySelectorAll(".forms"));
 // Iterate over the resulting array
 formList.forEach((formSelector) => {
   formSelector.addEventListener("submit", (evt) => {
     evt.preventDefault();
   });
   setEventListeners(formSelector);
 });
};
enableValidation();


enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",//to do
  inputErrorClass: "form__input_type_error",
  errorClass: "popup__error_visible" //form__input_has-error
});

 const formSelector = document.querySelector(".form");
 const inputSelector = document.querySelector(".form__input");

// prefent default
 formSelector.addEventListener("submit", function (evt) {
  evt.preventDefault();
});
// input event handler
formInput.addEventListener("input", function (evt) {


});

// function show input error
const showInputError = (formSelector,inputSelector,errorMessage) => {
  const formError = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.add("form__input_type_error");
  formError.textContent = errorMessage;
  formError.classList.add("form__error-text_active");
};
//hide input error
const hideInputError = (formSelector,inputSelector) => {
  const formError = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.remove("form__input_type_error");
  formError.classList.remove("form__input-error_active");
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

const setEventListeners = (formSelector) =>{
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
