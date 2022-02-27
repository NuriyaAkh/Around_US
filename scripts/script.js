const profileEditButton = document.querySelector(".profile__button-name-edit");
const editFormCloseButton = document.querySelector('.form__button-close');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__about');


const form = document.querySelector('.forms');
const editForm = form.querySelector('.form');
const formInputName = document.querySelector('#username');
const formInputJob = document.querySelector('#about');


function closeForm(){
  form.classList.remove("forms_is-open");
}
function openForm (){
   form.classList.add("forms_is-open");
   formInputName.value = profileName.textContent;
   formInputJob.value = profileJob.textContent;
}

function handleProfileFormSubmit(evt) {

    evt.preventDefault();
    profileName.textContent = formInputName.value;
    profileJob.textContent = formInputJob.value;
    closeForm();

}


form.addEventListener('submit', handleProfileFormSubmit);
profileEditButton.addEventListener("click",openForm);
editFormCloseButton.addEventListener("click", closeForm);

