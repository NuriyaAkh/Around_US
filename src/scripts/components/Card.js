import PopupWithImage from "./PopupWithImage";
export default class Card {
  constructor({ data, handleShowImage }, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector; // assigns the selector to the private field ("#card")
    this._handleImageClick = handleShowImage;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }
  //public method
  generateCard() {
    // Store the markup in the private field _element
    // so that other elements can access it
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(".card__title").textContent = this._name;
    this._imageElement = this._element.querySelector(".card__img");
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._imageElement.addEventListener("click", this._handleImageClick);
    return this._element;
  }
  _setEventListeners() {
    //like button
    this._element
      .querySelector(".card__button")
      .addEventListener("click", (evt) => {
        this._handleLikeButton(evt);
      });
    //delete card
    this._element
      .querySelector(".card__delete")
      .addEventListener("click", (evt) => {
        this._handleDeleteCard(evt);
      });
  }
  _handleLikeButton(evt) {
    evt.target.classList.toggle("card__button_active");
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }
}
