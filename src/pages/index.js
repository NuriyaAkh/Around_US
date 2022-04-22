import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
import "./index.css";
import {
  formValidationSettings,
  initialCards,
  editProfileForm,
  addImageForm,
  imageForm,
  profileForm,
  openProfileEditButton,
  openImageAddButton,
  profileName,
  profileJob,
  inputName,
  inputJob,
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
  addNewImageForm.open();
}

// function open edit form
function openEditProfileForm() {
  fillProfileForm();
  editProfileFormValidator.resetValidation();
  editUserInfoForm.open();
}
// prefill the profile form
function fillProfileForm() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
}
// function to submit edit profile info
function handleProfileFormSubmit() {
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
}
//init popup profile
const editUserInfoForm = new PopupWithForm(
  {
    popupSelector: "#edit-profile",
    handleFormSubmit: handleProfileFormSubmit
  }
);
editUserInfoForm.setEventListeners();
//init user info
const profileInfo = new UserInfo({
  userName: ".profile__name",
  userOccupation: ".profile__about",
});

// event listnerens
openProfileEditButton.addEventListener("click", openEditProfileForm);
openImageAddButton.addEventListener("click", openAddImageForm);

// function to submit add image form
function handleImageFormSubmit(data) {

  const element = new Card ({data, handleShowImage : (imgData) => {
      cardShowImage.open(imgData); }}, "#card");
  const newAddedCard = element.generateCard();
  cardList.addItem(newAddedCard);

}
//init popup add image
const addNewImageForm = new PopupWithForm(
  {popupSelector: "#img-add",
  handleFormSubmit: handleImageFormSubmit});
addNewImageForm.setEventListeners();

//init preview image
const cardShowImage = new PopupWithImage("#image-show");
cardShowImage.setEventListeners();

//init cards to show
const cardList = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const card = new Card(
        {
          data,
          handleShowImage : (imgData) => {
            cardShowImage.open(imgData);
          },
        },
        "#card"
      );
      const cardElement = card.generateCard();

      cardList.addItem(cardElement);
    },
  },
  ".cards__container"
);
cardList.renderItems();









