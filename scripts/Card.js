import {openPopup} from "./utils.js"

const popupImage = document.querySelector(".forms__image");
const popupImageTitle = document.querySelector(".forms__image-title");
const popupShowImageElement = document.querySelector("#image-show");

export default class Card {
  constructor(data, cardSelector){
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector; // assigns the selector to the private field ("#card")

  }
  _getTemplate() {
  const cardElement = document
  .querySelector(this._cardSelector)
  .content.querySelector(".card").cloneNode(true);

  return cardElement;
  }
  //public method
  generateCard() {
    // Store the markup in the private field _element
  // so that other elements can access it
    this._element = this._getTemplate();
    this._setEventListeners();
    // Add data
    this._element.querySelector(".card__title").textContent = this._name;
    this._element.querySelector(".card__img").alt = this._name;
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
    this._element = null;
  }
}

