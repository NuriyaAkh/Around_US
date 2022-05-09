import Popup from "./Popup.js";
export default class PopupWithCofirmation extends Popup {
  constructor({popupSelector, handleYesSubmit}){
    super(popupSelector);
    this._handleYesSubmit = handleYesSubmit;
    this._card = card;
    this._yesButton = this._popupElement.querySelector(".form__button");
  }
  open(){
    super.open();

  }
  close(){
    super.close();
    this._yesButton.removeEventListener("click", ()=>{
      this._handleYesSubmit(this._card);
    })

  }
  setEventListeners(){
    this._yesButton.addEventListener("click", ()=>{
      this._handleYesSubmit(this._card);
    })

  }

}
