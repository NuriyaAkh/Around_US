import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._popupImage = document.querySelector(".forms__image");
    this._popupImageTitle = document.querySelector(".forms__image-title");
  }
  open(data) {
    console.log(data);
    this._popupImage.src = data.link;
    this._popupImage.alt = `Image ${data.name}`;
    console.log(this._popupImage.alt);
    this._popupImageTitle.textContent = data.name;
    super.open();
  }
}
