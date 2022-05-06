import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithCofirmation from "../scripts/components/PopupWithConfirmation.js";
import UserInfo from "../scripts/components/UserInfo.js";
import Api from "../scripts/components/Api.js";
import "./index.css";
import {
  formValidationSettings,
  editProfileForm,
  addImageForm,
  imageForm,
  openProfileEditButton,
  openImageAddButton,
  profileName,
  profileJob,
  userNameInput,
  userJobInput,
} from "../scripts/utils/constants.js";


let cardList;
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "66d060c3-a92b-49d0-add5-d7e29bf411c9",
    "Content-Type": "application/json",
  },
});
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
//init popup add new image
const addNewImageForm = new PopupWithForm({
  popupSelector: "#img-add",
  handleFormSubmit: (data) => {
    api.addNewCard(data)
    .then(data =>
    renderCard(data));
  },
});
addNewImageForm.setEventListeners();

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
  const { userInputName, userInputJob } = profileInfo.getUserInfo();
  userNameInput.value = userInputName;
  userJobInput.value = userInputJob;
}
// function to submit edit profile info
function handleProfileFormSubmit(userData) {
  api
    .editProfileInfo(userData)
    .then((userData) => {
      console.log(userData);
      profileInfo.setUserInfo({
        userInputName: userData.name,
        userInputJob: userData.about,
        userAvatar: userData.avatar
      });

    })
    .catch((err) => {
      console.log(err); // log the error to the console
    });

  // profileName.textContent = userNameInput.value;
  // profileJob.textContent = userJobInput.value;
}
//init popup profile
const editUserInfoForm = new PopupWithForm({
  popupSelector: "#edit-profile",
  handleFormSubmit: handleProfileFormSubmit,
});
editUserInfoForm.setEventListeners();

//init user info
const profileInfo = new UserInfo({
  userNameSelector: ".profile__name",
  userOccupationSelector: ".profile__about",
  userPictureSelector: ".profile__img",
});

api.getUserData().then((userData) => {
  profileInfo.setUserInfo({
    userInputName: userData.name,
    userInputJob: userData.about,
    userAvatar: userData.avatar,
  });
});

//show cards
api.getInitialCards().then((cardData) => {
  console.log(cardData);
  cardList = new Section(
    {
      items: cardData,
      renderer: renderCard,
    },
    ".cards__container"
  );

  cardList.renderItems();
});


//init preview image
const cardShowImage = new PopupWithImage("#image-show");

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
//popup confirmation to delete card
const deleteConfirmationForm = new PopupWithCofirmation({
  popupSelector:"#confirm-popup",
  handleYesSubmit: handleYesSubmit,});
deleteConfirmationForm.setEventListeners();

function handleYesSubmit(card) {
  api.deleteCard(card.id)
  .then(res => {
  deleteConfirmationForm.close();
  card.handleDeleteCard();
})
.catch((err) => {console.log(err);});
};

// //test delete card
// api.deleteCard("627488229d42cd0012c27739")
// then(res => console.log(res));
// event listnerens
openProfileEditButton.addEventListener("click", openEditProfileForm);
openImageAddButton.addEventListener("click", openAddImageForm);

//  fetch("https://around.nomoreparties.co/v1/group-12/cards", {
//   headers: {
//     authorization: "66d060c3-a92b-49d0-add5-d7e29bf411c9"
//   }
// })
//   .then(res => res.json())
//   .then((result) => {
//     console.log(result);
//   });
//   fetch ("https://around.nomoreparties.co/v1/group-12/users/me", {
//   headers: {
//     authorization: "66d060c3-a92b-49d0-add5-d7e29bf411c9"
//   }
// })
//   .then(res => res.json())
//   .then((result) => {
//     console.log(result);
//   });
/* fetch("https://around.nomoreparties.co/v1/group-12/users/me", {
  method: "PATCH",
  headers: {
    authorization: "66d060c3-a92b-49d0-add5-d7e29bf411c9",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name: "Nuriya Akhmedova",
    about: "Software Developer, explorer, mom"
  })
}); */

//toDo
//PopupConfirmation to delete card
//likes function
