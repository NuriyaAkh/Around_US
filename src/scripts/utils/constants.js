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
const profileAvatarForm = document.querySelector("#update-avatar-popup");
const avatarForm = document.querySelector("#avatar-form");

// buttons
const openProfileEditButton =
    document.querySelector('.profile__button-name-edit');
const openImageAddButton = document.querySelector('.profile__button-add');
const editProfilePictureButton = document.querySelector(".profile__img-icon");
const closeEditFormButton =
    editProfileForm.querySelector('.forms__button-close');

const closeAddImageFormButton =
    addImageForm.querySelector('.forms__button-close');

// profile DOM nodes updates info of the profile
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__about');

// form data and elements
const userNameInput = editProfileForm.querySelector('#username');
const userJobInput = editProfileForm.querySelector('#about');
const inputImagePlaceName = addImageForm.querySelector('#title');
const inputImageUrl = addImageForm.querySelector('#image-link');



export { formValidationSettings, cardsContainer, editProfileForm, addImageForm, imageForm, profileForm,avatarForm,profileAvatarForm, openProfileEditButton, editProfilePictureButton,openImageAddButton, closeEditFormButton, closeAddImageFormButton, profileName, profileJob, userNameInput, userJobInput, inputImagePlaceName, inputImageUrl};


