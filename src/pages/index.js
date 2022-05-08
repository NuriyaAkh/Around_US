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
  avatarForm,
  profileAvatarForm,
  openProfileEditButton,
  openImageAddButton,
  editProfilePictureButton,
  profileName,
  profileJob,
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
// form validation
const editProfileFormValidator = new FormValidator(
  formValidationSettings,
  editProfileForm
);
const addImageFormValidator = new FormValidator(
  formValidationSettings,
  addImageForm
);
const editProfilePictureFormValidator = new FormValidator(
  formValidationSettings,
  profileAvatarForm
);
editProfileFormValidator.enableValidation();
addImageFormValidator.enableValidation();
editProfilePictureFormValidator.enableValidation();
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
function openEditProfilePictureForm(){
  avatarForm.reset();
  editProfilePictureFormValidator.resetValidation();
  editUserImageForm.open();
}
// function to submit edit profile info
function handleProfileFormSubmit(userData) {

  api.editProfileInfo(userData)
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
function handleProfileImageSubmit(data){
  api.editProfilePicture(data)
  .then((result)=> {
    profileInfo.setUserInfo({
      userInputName: result.name,
      userInputJob: result.about,
      userAvatar: result.avatar
    });

  })
  .catch((err) => {
    console.log(err); // log the error to the console
  });
}
//init popup profile
const editUserInfoForm = new PopupWithForm({
  popupSelector: "#edit-profile",
  handleFormSubmit: handleProfileFormSubmit,
});
editUserInfoForm.setEventListeners();
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
      openConfirmationPopup: () =>{
        deleteConfirmationForm.open();
      },
      handleLikes: () =>{

      },
    },
    "#card"
  );
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
}
api.promiseAll()
.then(([user,cardData]) => {
  currentUserId = user.id;
  cardList = new Section(
    {
      items: cardData,
      renderer: renderCard,
    },
    ".cards__container"
  );

  cardList.renderItems();
  profileInfo.setUserInfo({
    userInputName: user.name,
    userInputJob: user.about,
    userAvatar: user.avatar,});
})
.catch(err => console.error(`Error while executing: ${err}`));
//confirmation poup to delete card
const deleteConfirmationForm = new PopupWithCofirmation({
  popupSelector:"#confirm-popup",
  handleYesSubmit: handleYesSubmit,});
deleteConfirmationForm.setEventListeners();

function handleYesSubmit(card) {
  api.deleteCard(card.cardId)
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
editProfilePictureButton.addEventListener("click", openEditProfilePictureForm);


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
