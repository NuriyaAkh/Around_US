import Popup from "./Popup.js";
export default class PopupWithCofirmation extends Popup {
  constructor(popupSelector, handleYesSubmit){
    super(popupSelector);
    this._handleYesSubmit = handleYesSubmit;
    this._card = card;
    this._yesButton = this._popupElement.querySelector(".form__button");
  }
  open(){
    super.open();
    this._yesButton.addEventListener("submit", ()=>{
      this._handleYesSubmit(this._card);
    })

  }
  close(){
    super.close();
  }

}
