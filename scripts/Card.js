import {openPopup} from "./utils.js"

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

export default class Card {
  constructor(data, cardSelector){
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector; // assign the selector to the private field ("#card")

  }
  _getTemplate() {
  const cardElement = document
  .querySelector(this._cardSelector)
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
 const card = new Card (item, "#card"); // pass an object as an argument
 // Fill up the card and return it
 const cardElement = card.generateCard();
  // Add it to the DOM
  document.querySelector(".cards__container").prepend(cardElement);
});
