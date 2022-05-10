import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithConfirmation from "../scripts/components/PopupWithConfirmation.js";
import UserInfo from "../scripts/components/UserInfo.js";
import Api from "../scripts/components/Api.js";
import "./index.css";
import {
  formValidationSettings,
  editProfileForm,
  imageForm,
  avatarForm,
  profileForm,
  openProfileEditButton,
  openImageAddButton,
  editProfilePictureButton,
  userNameInput,
  userJobInput,
} from "../scripts/utils/constants.js";

let cardList;
let currentUserId;
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "66d060c3-a92b-49d0-add5-d7e29bf411c9",
    "Content-Type": "application/json",
  },
});

const formValidators = {};

// enable validation
const enableValidation = (formValidationSettings) => {
  const formList = Array.from(
    document.querySelectorAll(formValidationSettings.formSelector)
  );

  formList.forEach((formElement) => {
    const validator = new FormValidator(formElement, formValidationSettings);
    //  get the name of the form
    const formName = formElement.getAttribute("name");
    // here you store a validator by the `name` of the form
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(formValidationSettings);

formValidators[profileForm.getAttribute("name")].resetValidation();
formValidators[avatarForm.getAttribute("name")].resetValidation();
formValidators[imageForm.getAttribute("name")].resetValidation();

// or you can use a string – the name of the form (you know it from `index.html`)

//formValidators['profile-form'].resetValidation()

//init cards, user info
api
  .getAllData()
  .then(([user, cardData]) => {
    profileInfo.setUserInfo({
      userInputName: user.name,
      userInputJob: user.about,
      userAvatar: user.avatar,
    });
    currentUserId = user._id;
    cardList = new Section({
      items: cardData,
      renderer: renderCard,
      containerSelector: ".cards__container",
    });
    cardList.renderItems();
  })
  .catch((err) => console.error(`Error while executing: ${err}`));

//init popup add new image
const addNewImageForm = new PopupWithForm({
  popupSelector: "#img-add",
  handleFormSubmit: (data) => {
    addNewImageForm.renderLoading(true);
    api
      .addNewCard(data)
      .then((data) => {
        renderCard(data);
        addNewImageForm.close();
      })
      .catch((err) => {
        console.log(err); // log the error to the console
      })
      .finally(() => {
        addNewImageForm.renderLoading(false);
      });
  },
});
addNewImageForm.setEventListeners();

//init popup to update profile info
const editUserInfoForm = new PopupWithForm({
  popupSelector: "#edit-profile",
  handleFormSubmit: handleProfileFormSubmit,
});
editUserInfoForm.setEventListeners();

//init popup to change avatar
const editUserImageForm = new PopupWithForm({
  popupSelector: "#update-avatar-popup",
  handleFormSubmit: handleProfileImageSubmit,
});
editUserImageForm.setEventListeners();

//init user info
const profileInfo = new UserInfo({
  userNameSelector: ".profile__name",
  userOccupationSelector: ".profile__about",
  userPictureSelector: ".profile__img",
});

//init preview image
const cardShowImage = new PopupWithImage("#image-show");

//init confirmation popup to delete card
const deleteConfirmationForm = new PopupWithConfirmation({
  popupSelector: "#confirm-popup",
});

// render card
function renderCard(data) {
  const card = new Card({
    data,
    handleImageClick: () => {
      cardShowImage.open(data);
    },
    handleTrashClick: () => {
      deleteConfirmationForm.setSubmit(() => {
        console.log(card.getCardId());
        api
          .deleteCard(card.getCardId())
          .then((res) => {
            deleteConfirmationForm.close();
            card.handleDeleteCard();
          })
          .catch((err) => {
            console.log(err);
          });
      });
      deleteConfirmationForm.open();
    },
    handleLikeClick: (card) => {
      if (card.isLiked()) {
        api
          .removeLike(card.getCardId())
          .then((res) => card.handleLikeData(res))
          .catch((err) => {
            console.log(err);
          });
      } else {
        api
          .addLike(card.getCardId())
          .then((res) => card.handleLikeData(res))
          .catch((err) => {
            console.log(err);
          });
      }
    },
    currentUserId,
    cardSelector: "#card",
  });
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
}

// function show add image form
function openAddImageForm() {
  formValidators[imageForm.getAttribute("name")].resetValidation();
  // addImageFormValidator.resetValidation();
  addNewImageForm.open();
}

// function open edit form
function openEditProfileForm() {
  fillProfileForm();
  formValidators[profileForm.getAttribute("name")].resetValidation();
  //editProfileFormValidator.resetValidation();
  editUserInfoForm.open();
}
// prefill the profile form
function fillProfileForm() {
  const { userInputName, userInputJob } = profileInfo.getUserInfo();
  userNameInput.value = userInputName;
  userJobInput.value = userInputJob;
}
function openEditProfilePictureForm() {
  formValidators[avatarForm.getAttribute("name")].resetValidation();
  //editProfilePictureFormValidator.resetValidation();
  editUserImageForm.open();
}
// function to submit edit profile info
function handleProfileFormSubmit(userData) {
  editUserInfoForm.renderLoading(true);
  api
    .editProfileInfo(userData)
    .then((userData) => {
      console.log(userData);
      profileInfo.setUserInfo({
        userInputName: userData.name,
        userInputJob: userData.about,
        userAvatar: userData.avatar,
      });
      editUserInfoForm.close();
    })
    .catch((err) => {
      console.log(err); // log the error to the console
    })
    .finally(() => {
      editUserInfoForm.renderLoading(false);
    });
}
//function to handle editUserImageForm
function handleProfileImageSubmit(data) {
  editUserImageForm.renderLoading(true);
  api
    .editProfilePicture(data)
    .then((result) => {
      profileInfo.setUserInfo({
        userInputName: result.name,
        userInputJob: result.about,
        userAvatar: result.avatar,
      });
      editUserImageForm.close();
    })
    .catch((err) => {
      console.log(err); // log the error to the console
    })
    .finally(() => {
      editUserImageForm.renderLoading(false);
    });
}

// event listnerens
openProfileEditButton.addEventListener("click", openEditProfileForm);
openImageAddButton.addEventListener("click", openAddImageForm);
editProfilePictureButton.addEventListener("click", openEditProfilePictureForm);
