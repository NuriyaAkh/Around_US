import { resetValidation } from "./validate.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];
const popupImage = document.querySelector(".forms__image");
const popupImageTitle = document.querySelector(".forms__image-title");
const popupShowImageElement = document.querySelector("#image-show");
const popupCloseButton = document.querySelector(".forms__button-close");
const popupElement = document.querySelector(".forms");
class Card {
  constructor(data){
    this._name = data.name;
    this._link = data.link;

  }
  _getTemplate() {
  const cardElement = document
  .querySelector("#card")
  .content.querySelector(".card").cloneNode(true);

  return cardElement;
  }
  generateCard() {
    // Store the markup in the private field _element
  // so that other elements can access it
    this._element = this._getTemplate();
    this._setEventListeners();
    // Add data
    this._element.querySelector(".card__title").textContent = this._name;
    this._element.querySelector(".card__img").src = this._link;
   // Return the element
   return this._element;

  }
  _setEventListeners(){
    //like button
    this._element.querySelector(".card__button").addEventListener("click",(evt) => {
      this._handleLikeButton(evt);
    });
    //open Show Image popup
    this._element.querySelector(".card__img").addEventListener("click",() => {
      this._handleShowImage();
    });
    //delete card
    this._element.querySelector(".card__delete").addEventListener("click",(evt) => {
      this._handleDeleteCard(evt);
    });
  }

  _handleShowImage (){
    popupImage.src = this._link;
    popupImage.alt = `${this._name}`;
    popupImageTitle.textContent = this._name;
    openPopup(popupShowImageElement);

  }

  _handleLikeButton(evt) {
    evt.target.classList.toggle("card__button_active");
  }

  _handleDeleteCard(evt) {
    evt.target.closest(".card").remove();
}
}
// iterate over the entire original array
initialCards.forEach((item) => {
 // Create a card instance
 const card = new Card (item); // pass an object as an argument
 // Fill up the card and return it
 const cardElement = card.generateCard();
  // Add it to the DOM
  document.querySelector(".cards__container").prepend(cardElement);
});
//open forms
function openPopup(popup) {
  popup.classList.add("forms_is-open");
  document.addEventListener("keydown",handleKeyEsc);
  document.addEventListener("mousedown",handleMouseDown);
}

/*
// templates
const cardTemplate = document
  .querySelector("#card")
  .content.querySelector(".card");

// Wrappers
const cardsContainer = document.querySelector(".cards__container");
const editProfileForm = document.querySelector("#edit-profile");
const addImageForm = document.querySelector("#img-add");
const imageShowForm = document.querySelector("#image-show");
const imageForm = document.querySelector("#add-form");
const profileForm = document.querySelector("#edit-form");

// buttons
const openProfileEditButton = document.querySelector(
  ".profile__button-name-edit"
);
const openImageAddButton = document.querySelector(".profile__button-add");
const closeEditFormButton = editProfileForm.querySelector(
  ".forms__button-close"
);
const closeShowImageButton = imageShowForm.querySelector(
  ".forms__button-close"
);
const closeAddImageFormButton = addImageForm.querySelector(
  ".forms__button-close"
);

// profile DOM nodes updates info of the profile

const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__about");

// form data and elements

const inputName = editProfileForm.querySelector('#username');
const inputJob = editProfileForm.querySelector('#about');
const inputImagePlaceName = addImageForm.querySelector('#title');
const inputImageUrl = addImageForm.querySelector('#image-link');
const imageTitle = imageShowForm.querySelector('.forms__image-title');
const imageElement = imageShowForm.querySelector('.forms__image');


// create card/ add
function createCard(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__img");
  const cardTitle = cardElement.querySelector(".card__title");

  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  // likes button
  const likeButton = cardElement.querySelector(".card__button");
  likeButton.addEventListener("click", handleLikeButton);
  // delete card
  const deleteButton = cardElement.querySelector(".card__delete");
  deleteButton.addEventListener("click", handleDeleteCard);
  // show image
  cardImage.addEventListener("click", () => handleShowImage(data));
  return cardElement;
}
// close forms
const closePopup = (popup) => {
  popup.classList.remove("forms_is-open");
  document.removeEventListener("keydown",handleKeyEsc);
  document.removeEventListener("mousedown",handleMouseDown);
}
//open forms
function openPopup(popup) {
  popup.classList.add("forms_is-open");
  document.addEventListener("keydown",handleKeyEsc);
  document.addEventListener("mousedown",handleMouseDown);
}
//function show add image form
function openAddImageForm() {
  imageForm.reset();//reset form
  resetValidation(imageForm);
  openPopup(addImageForm);
}

// function open edit forms
function openEditProfileForm() {
  fillProfileForm();
  resetValidation(editProfileForm);
  openPopup(editProfileForm);
}
//prefill the profile form
function fillProfileForm(){
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
}
//function to submit edit profile info,checks the data is entered
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(editProfileForm);
  profileForm.reset();
 }
//event listnerens
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
closeShowImageButton.addEventListener("click", () => {
  closePopup(imageShowForm);
});

// delete card function
function handleDeleteCard(evt) {
  evt.target.closest(".card").remove();
}
//like function
function handleLikeButton(evt) {
  evt.target.classList.toggle("card__button_active");
}
// function show image
function handleShowImage(data) {
  imageElement.src = data.link;
  imageElement.alt = `${data.name}`;
  imageTitle.textContent = data.name;
  openPopup(imageShowForm);
}
//function to submit and check for required fields add image form
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
//render
function renderCard(data, cardsContainer) {
  cardsContainer.prepend(createCard(data));
}
// generate 6 cards
initialCards.forEach((data) => {
  renderCard(data, cardsContainer);
});
//esc press to close forms
function handleKeyEsc(evt){
  const currentPopup = document.querySelector(".forms_is-open");
      if (evt.key ==="Escape"){
      closePopup(currentPopup);
    };
  };

//overlay to close Edit Profile popup
function handleMouseDown(evt){
  const currentPopup = document.querySelector(".forms_is-open");
  if (evt.target.classList.contains("forms") ||
      evt.target.classList.contains("forms__button-close")
    ){
      closePopup(currentPopup);
    }
};
*/
