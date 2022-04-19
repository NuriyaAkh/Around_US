import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
  //It takes two arguments: the popup selector, and a callback function which PopupWithForm calls when the form’s submit event fires.
constructor({popupSelector, handleFormSubmit}){
  super(popupSelector);
  this._popupForm = this._popupElement.querySelector(".forms");

}
// which collects data from all the input fields and returns that data as an object.
_getInputValues(){}
//It modifies the setEventListeners() parent method. The setEventListeners() method of the PopupWithForm class has to add the submit event handler to the form and the click event listener to the close icon.
setEventListeners(){}
//It modifies the close() parent method in order to reset the form once the popup is closed.
close(){}
}
