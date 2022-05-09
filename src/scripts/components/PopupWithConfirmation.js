import Popup from "./Popup.js";
export default class PopupWithConfirmation extends Popup {
  constructor({popupSelector}){
    super(popupSelector);

    this._yesButton = this._popupElement.querySelector(".form__button");
  }
  open(){
    this._yesButton.addEventListener("click", this._handleYesSubmit);
    super.open();

  }
  close(){

    this._yesButton.removeEventListener("click",this._handleYesSubmit);
    super.close();

  }
  setSubmit(handleYesSubmit){
    this._handleYesSubmit = handleYesSubmit;
  }



}
