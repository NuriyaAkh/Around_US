import Cards from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
//import { closePopup, openPopup } from "../scripts/utils.js";
import "./index.css";
import PopupWithImage from "../scripts/components/PopupWithImage.js";

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
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";

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
  open(editProfileForm);
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
openProfileEditButton.addEventListener("click", () => {
  profilePopupForm.open();
  profilePopupForm.getUserInfo();
});
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

//8
//init cards to show
const cardList = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const card = new Cards(
        {
          data,
          handleImageClick: (imgData) => {
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

//init preview image
const cardShowImage = new PopupWithImage("#image-show");
cardShowImage.setEventListeners();
// init user info
const profileInfo = new UserInfo({userName:".prodile__name", userOccupation:".profile__job"});
profileInfo.setUserInfo();
//init popup profile
const profilePopupForm = new PopupWithForm ("#edit-profile", handleProfileFormSubmit);
profilePopupForm.setEventListeners();
