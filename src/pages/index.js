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
  openProfileEditButton,
  openImageAddButton,
  profileName,
  profileJob,
  userInputName,
  userInputJob,
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
  userInputName.value = profileName.textContent;
  userInputJob.value = profileJob.textContent;
}
// function to submit edit profile info
function handleProfileFormSubmit() {
  profileName.textContent = userInputName.value;
  profileJob.textContent = userInputJob.value;
}
//init popup profile
const editUserInfoForm = new PopupWithForm({
  popupSelector: "#edit-profile",
  handleFormSubmit: handleProfileFormSubmit,
});
editUserInfoForm.setEventListeners();

//init user info
const profileInfo = new UserInfo({
  userName: ".profile__name",
  userOccupation: ".profile__about",
});

//init popup add image
const addNewImageForm = new PopupWithForm({
  popupSelector: "#img-add",
  handleFormSubmit: (data) => {
    renderCard(data);
  },
});
addNewImageForm.setEventListeners();

//init cards to show
const cardList = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  ".cards__container"
);
cardList.renderItems();

//init preview image
const cardShowImage = new PopupWithImage("#image-show");
//cardShowImage.setEventListeners();

function renderCard(data) {
  const card = new Card(
    {
      data,
      handleShowImage: () => {
        cardShowImage.open(data);
      },
    },
    "#card"
  );
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
}

// event listnerens
openProfileEditButton.addEventListener("click", openEditProfileForm);
openImageAddButton.addEventListener("click", openAddImageForm);
