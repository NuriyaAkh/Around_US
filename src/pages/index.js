import Cards from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import { closePopup, openPopup } from "../scripts/utils.js";
import "./index.css";

//8
import {
  formValidationSettings,
  initialCards,
  cardsContainer,
  editProfileForm,
  addImageForm,
  imageForm,
  profileForm,
  openProfileEditButton,
  openImageAddButton,
  closeEditFormButton,
  closeAddImageFormButton,
  profileName,
  profileJob,
  inputName,
  inputJob,
  inputImagePlaceName,
  inputImageUrl,
} from "../scripts/utils/constants.js";

// form validation
const editProfileFormValidator = new FormValidator(
  formValidationSettings,
  editProfileForm
);
const addImageFormValidator = new FormValidator(
  formValidationSettings,
  addImageForm
);
editProfileFormValidator.enableValidation();
addImageFormValidator.enableValidation();

// function show add image form
function openAddImageForm() {
  imageForm.reset(); // reset form
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
}
// event listnerens
editProfileForm.addEventListener("submit", handleProfileFormSubmit);
openProfileEditButton.addEventListener("click", openEditProfileForm);
addImageForm.addEventListener("submit", handleImageFormSubmit);
openImageAddButton.addEventListener("click", openAddImageForm);
closeEditFormButton.addEventListener("click", () => {
  closePopup(editProfileForm);
});
closeAddImageFormButton.addEventListener("click", () => {
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
    cardsContainer
  );

  closePopup(addImageForm);
}

// render
function renderCard(data, cardsContainer) {
  const card = new Cards(data, "#card").generateCard(); // pass an object as an argument
  // Fill up the card and return it
  // Add it to the DOM
  cardsContainer.prepend(card);
}

const cardList = new Section({ data: items }, cardsContainer);
// put initial cards into DOM
cardsContainer.renderer();
