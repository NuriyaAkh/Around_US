const formValidationSettings = {
  formSelector: '.forms',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error-text_active'
};

// Wrappers
const cardsContainer = document.querySelector('.cards__container');
const editProfileForm = document.querySelector('#edit-profile');
const addImageForm = document.querySelector('#img-add');
const imageForm = document.querySelector('#add-form');
const profileForm = document.querySelector('#edit-form');

// buttons
const openProfileEditButton =
    document.querySelector('.profile__button-name-edit');
const openImageAddButton = document.querySelector('.profile__button-add');
const closeEditFormButton =
    editProfileForm.querySelector('.forms__button-close');

const closeAddImageFormButton =
    addImageForm.querySelector('.forms__button-close');

// profile DOM nodes updates info of the profile
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__about');

// form data and elements
const userInputName = editProfileForm.querySelector('#username');
const userInputJob = editProfileForm.querySelector('#about');
const inputImagePlaceName = addImageForm.querySelector('#title');
const inputImageUrl = addImageForm.querySelector('#image-link');
const baseUrl = "https://around.nomoreparties.co/v1/group-12";


export { formValidationSettings, cardsContainer, editProfileForm, addImageForm, imageForm, profileForm, openProfileEditButton, openImageAddButton, closeEditFormButton, closeAddImageFormButton, profileName, profileJob, userInputName, userInputJob, inputImagePlaceName, inputImageUrl, baseUrl};


