export default class Card {
  constructor({ data, handleImageClick, handleLikeClick,  handleTrashClick,}, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._likes = data.likes;
    this._handleLikeClick = handleLikeClick;
    this._cardId = data._id;
    this._deleteConfirmationForm =  handleTrashClick;
    this._currentUserId = data.currentUserId;
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
    this._imageElement = this._element.querySelector(".card__img");
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._imageElement.addEventListener("click", this._handleImageClick);
    this._cardLikesCounter = this._element.querySelector(".card__likes-counter");
    this._cardLikesCounter.textContent = this._likes.length;
    this._loveIcon = this._element.querySelector(".card__button");
    this._trashIcon = this._element.querySelector(".card__delete");
    if(this._ownerId !== this._currentUserId ){
      this._trashIcon.remove();
      this._trashIcon = null;
    }
    //todo check
    this._likes.forEach((item) =>{
      if(item._id === this._currentUserId){
        this._handleLikeButton(this._loveIcon);
      }
    });
    return this._element;
  }
  _setEventListeners() {
    //like button
    this._loveIcon.addEventListener("click", () => {
        this._handleLikeClick();
      });
    //delete card
    if (this._trashIcon){
      this._trashIcon.addEventListener("click", () => {
        this._deleteConfirmationForm(this);
      });}
  }

  //todo handle like
  handleLikeButton(result) {
    this._loveIcon.classList.toggle("card__button_active");
   this._cardLikesCounter.textContent = result.likes.length;
  }
 isLiked(){
   return this._loveIcon.classList.contains("card__button_active");
 }
  handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }
}

