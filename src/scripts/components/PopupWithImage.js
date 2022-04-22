import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._popupImage = document.querySelector(".forms__image");
    this._popupImageTitle = document.querySelector(".forms__image-title");
  }
  open(data) {
    this._popupImage.src = data.link;
    this._popupImage.alt = `Image ${data.text}`;
    this._popupImageTitle.textContent = data.text;
    super.open();
  }
}
