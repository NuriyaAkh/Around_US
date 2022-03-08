const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];

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


editForm.addEventListener('submit', handleProfileFormSubmit);
profileEditButton.addEventListener("click",openForm);
editFormCloseButton.addEventListener("click", closeForm);

