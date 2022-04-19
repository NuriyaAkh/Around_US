import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._popupImage = document.querySelector(".forms__image");
    this._popupImageTitle = document.querySelector(".forms__image-title");
  }
  // In the open() method add an image to the popup and the corresponding image src attribute along with a caption for the image.
  open(data) {
    this._popupImage.src = data.link;
    this._popupImage.alt = `Image ${data.text}`;
    this._popupImageTitle.textContent = data.text;
    super.open();
  }
}
