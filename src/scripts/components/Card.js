import PopupWithImage from "./PopupWithImage";
export default class Card {
  constructor({ data, handleShowImage, handleLikes,  openConfirmationPopup}, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleShowImage;
    this._likes = data.likes;
    this._handleLikes = handleLikes;
    this._cardId = data._id;
    this._deleteConfirmationForm =  openConfirmationPopup;
    this._currentUserId=data.currentUserId;
    this._ownerId = data.owner;
  }
  getCardId(){
    return this._cardId;
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
    const imageElement = this._element.querySelector(".card__img");
    imageElement.src = this._link;
    imageElement.alt = this._name;
    imageElement.addEventListener("click", this._handleImageClick);
    const cardLikesCounter = this._element.querySelector(".card__likes-counter");
    cardLikesCounter.textContent = this._likes.length;
    this._likeButton = this._element.querySelector(".card__button");
    this._trashIcon = this._element.querySelector(".card__delete");
    if(this._ownerId !==this._currentUserId ){
      this._trashIcon.remove();
      this._trashIcon = null;
    }
    this._likes.forEach((item) =>{
      if(item._id === this._currentUserId){
        this._handleLikeButton(this._likeButton);
      }
    });
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
    this._element.querySelector(".card__delete").addEventListener("click", () => {
        this._deleteConfirmationForm(this);
      });
  }
  //todo handle like
  _handleLikeButton() {
    evt.target.classList.toggle("card__button_active");
   cardLikesCounter.textContent = evt.likes.length;
  }

  handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }
}

