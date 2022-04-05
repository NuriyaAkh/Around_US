//Create a file constants.js and
//move all the global constants, such as settings,
//into that file. Note that DOM elements that are searched for
//aren't exactly global constants since they are searched for on the page
//during script execution, so they should not be moved to that file.
const formValidationSettings = {
  formSelector: '.forms',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error-text_active'
};
export { formValidationSettings };
