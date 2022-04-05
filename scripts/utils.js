
  //open forms
 function openPopup(popup) {
  popup.classList.add("forms_is-open");
  document.addEventListener("keydown",handleKeyEsc);
  document.addEventListener("mousedown",handleMouseDown);
}
// close forms
 const closePopup = (popup) => {
  popup.classList.remove("forms_is-open");
  document.removeEventListener("keydown",handleKeyEsc);
  document.removeEventListener("mousedown",handleMouseDown);
}
function handleKeyEsc(evt){
  const currentPopup = document.querySelector(".forms_is-open");
      if (evt.key ==="Escape"){
      closePopup(currentPopup);
    };
  };
  //overlay to close Edit Profile popup
function handleMouseDown(evt){
  const currentPopup = document.querySelector(".forms_is-open");
  if (evt.target.classList.contains("forms") ||
      evt.target.classList.contains("forms__button-close")
    ){
      closePopup(currentPopup);
    }
};
export {openPopup, closePopup}
