import PopupWithImage from "./PopupWithImage";
export default class Card {
  constructor({data, handleShowImage}, cardSelector) {
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

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(".card__title").textContent = this._name;
    this._element.querySelector(".card__img").src= this._link;
    this._element.querySelector(".card__img").alt =this._name;

    return this._element;
  }
  _setEventListeners() {
    //like button
    this._element
      .querySelector(".card__button")
      .addEventListener("click", (evt) => {
        this._handleLikeButton(evt);
      });
    //open Show Image popup
    this._element.querySelector(".card__img").addEventListener("click", () => {
      this._handleShowImage({ link: this._link, text: this._name });
    });
    //delete card
    this._element
      .querySelector(".card__delete")
      .addEventListener("click", (evt) => {
        this._handleDeleteCard(evt);
      });
  }

 _handleShowImage(imgData) {
  const cardShowImage = new PopupWithImage("#image-show");
  cardShowImage.setEventListeners();
  cardShowImage.open(imgData)}

  _handleLikeButton(evt) {
    evt.target.classList.toggle("card__button_active");
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }
}
