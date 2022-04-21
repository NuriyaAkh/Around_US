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
const initialCards = [
  {
    name: 'Yosemite Valley',
    link: 'https://code.s3.yandex.net/web-code/yosemite.jpg',
  },
  {
    name: 'Lake Louise',
    link: 'https://code.s3.yandex.net/web-code/lake-louise.jpg',
  },
  {
    name: 'Bald Mountains',
    link: 'https://code.s3.yandex.net/web-code/bald-mountains.jpg',
  },
  {
    name: 'Latemar',
    link: 'https://code.s3.yandex.net/web-code/latemar.jpg',
  },
  {
    name: 'Vanoise National Park',
    link: 'https://code.s3.yandex.net/web-code/vanoise.jpg',
  },
  {
    name: 'Lago di Braies',
    link: 'https://code.s3.yandex.net/web-code/lago.jpg',
  },
];
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
const inputName = editProfileForm.querySelector('#username');
const inputJob = editProfileForm.querySelector('#about');
const inputImagePlaceName = addImageForm.querySelector('#title');
const inputImageUrl = addImageForm.querySelector('#image-link');

export { formValidationSettings, initialCards, cardsContainer, editProfileForm, addImageForm, imageForm, profileForm, openProfileEditButton, openImageAddButton, closeEditFormButton, closeAddImageFormButton, profileName, profileJob, inputName, inputJob, inputImagePlaceName, inputImageUrl };
