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
  addImageForm,
  imageForm,
  avatarForm,
  profileAvatarForm,
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

api.promiseAll()
.then(([user,cardData]) => {
  profileInfo.setUserInfo({
    userInputName: user.name,
    userInputJob: user.about,
    userAvatar: user.avatar,});

  currentUserId = user._id;
  cardList = new Section(
    {
      items: cardData,
      renderer: renderCard,
      containerSelector: ".cards__container",}
  );

  cardList.renderItems();

})
.catch(err => console.error(`Error while executing: ${err}`));




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

//confirmation popup to delete card
const deleteConfirmationForm = new PopupWithConfirmation({
  popupSelector:"#confirm-popup"});

// render card
function renderCard(data) {

  const card = new Card(
    {
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
      handleLikeClick: () =>{},
      currentUserId,
      cardSelector: "#card",
    },

  );
  const cardElement = card.generateCard();
  console.log(card);
  cardList.addItem(cardElement);
}


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
editUserInfoForm.renderLoading(true);
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
    })
    .finally(()=>{
      editUserInfoForm.renderLoading(false);
    });
  }
function handleProfileImageSubmit(data){
  editUserImageForm.renderLoading(true);
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
  })
  .finally(()=>{
    editUserImageForm.renderLoading(false)
  })
}






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
