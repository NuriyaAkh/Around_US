import Cards from './Card.js';
import FormValidator from './FormValidator.js';
import {closePopup, openPopup} from './utils.js';

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
const formValidationSettings = {
  formSelector: '.forms',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error-text_active'
};

// form validation
const editProfileFormValidator =
    new FormValidator(formValidationSettings, editProfileForm);
const addImageFormValidator =
    new FormValidator(formValidationSettings, addImageForm);
editProfileFormValidator.enableValidation();
addImageFormValidator.enableValidation();

// function show add image form
function openAddImageForm() {
  imageForm.reset();  // reset form
  addImageFormValidator.resetValidation();
  openPopup(addImageForm);
}

// function open edit forms
function openEditProfileForm() {
  fillProfileForm();
  editProfileFormValidator.resetValidation();
  openPopup(editProfileForm);
}
// prefill the profile form
function fillProfileForm() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
}
// function to submit edit profile info,checks the data is entered
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(editProfileForm);
  profileForm.reset();
}
// event listnerens
editProfileForm.addEventListener('submit', handleProfileFormSubmit);
openProfileEditButton.addEventListener('click', openEditProfileForm);
addImageForm.addEventListener('submit', handleImageFormSubmit);
openImageAddButton.addEventListener('click', openAddImageForm);
closeEditFormButton.addEventListener('click', () => {
  closePopup(editProfileForm);
});
closeAddImageFormButton.addEventListener('click', () => {
  closePopup(addImageForm);
});


// function to submit and check for required fields add image form
function handleImageFormSubmit(evt) {
  evt.preventDefault();
  renderCard(
      {
        name: inputImagePlaceName.value,
        link: inputImageUrl.value,
      },
      cardsContainer);

  closePopup(addImageForm);
  imageForm.reset();
}

// render
function renderCard(data, cardsContainer) {
  const card =
      new Cards(data, '#card').generateCard();  // pass an object as an argument
  // Fill up the card and return it
  // Add it to the DOM
  cardsContainer.prepend(card);
}
// put initial cards into DOM
initialCards.forEach((data) => {renderCard(data, cardsContainer)});
