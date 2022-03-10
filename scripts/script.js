const initialCards = [
  {
    name: 'Yosemite Valley',
    link: 'https://code.s3.yandex.net/web-code/yosemite.jpg'
  },
  {
    name: 'Lake Louise',
    link: 'https://code.s3.yandex.net/web-code/lake-louise.jpg'
  },
  {
    name: 'Bald Mountains',
    link: 'https://code.s3.yandex.net/web-code/bald-mountains.jpg'
  },
  {name: 'Latemar', link: 'https://code.s3.yandex.net/web-code/latemar.jpg'}, {
    name: 'Vanoise National Park',
    link: 'https://code.s3.yandex.net/web-code/vanoise.jpg'
  },
  {name: 'Lago di Braies', link: 'https://code.s3.yandex.net/web-code/lago.jpg'}
];
// templates , may need to add .querySelector(".card"); at the end
const cardTemplate = document.querySelector('#card').content.querySelector(".card");

// Wrappes
const cardsContainer = document.querySelector('.cards__container');
const editProfileForm = document.querySelector('#edit-profile');
const addImageForm = document.querySelector('#img-add');
const imageShowForm = document.querySelector('#image-show');
// const form = document.querySelector(".forms");

// buttons
const openProfileEditButton = document.querySelector('.profile__button-name-edit');
const openImageAddButton = document.querySelector('.profile__button-add');
const closeEditFormButton = editProfileForm.querySelector('.form__button-close');
const closeShowImageButton = imageShowForm.querySelector('.form__button-close');
const closeAddImageFormButton = addImageForm.querySelector('.form__button-close');

// profile DOM nodes updates info of the profile

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__about');

// form data and elements

const inputName = editProfileForm.querySelector('#username');
const inputJob = editProfileForm.querySelector('#about');
const inputImagePlaceName = addImageForm.querySelector('#title');
const inputImageUrl = addImageForm.querySelector('#image-link');
const imageTitle = imageShowForm.querySelector('.form__image-title');
const imageElement = imageShowForm.querySelector('.form__image');



// close forms need to one function for all 3 forms
const closeForm = (forms) => {
  editProfileForm.classList.remove('forms_is-open');
};
function closeAddImageForm() {
  addImageForm.classList.remove('forms_is-open');
}
function closeShowImageForm() {
  imageShowForm.classList.remove('forms_is-open');
}


// function open forms need to one function for all 3 forms
function openForm() {
  editProfileForm.classList.add('forms_is-open');
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
}
function openAddImageForm() {
  addImageForm.classList.add('forms_is-open');
  inputImagePlaceName.value = imageTitle.textContent;
}

function openImageForm() {
  imageShowForm.classList.add('forms_is-open');
  const formImage = evt.target.src;
  const formImageTitle = evt.target.alt;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closeForm();
}

//need help
function handleAddImageFormSubmit(evt) {
  evt.preventDefault();
  imageTitle.textContent = InputImagePlace.value;
  closeAddImageForm();
}

editProfileForm.addEventListener('submit', handleProfileFormSubmit);
openProfileEditButton.addEventListener('click', openForm);
closeEditFormButton.addEventListener('click', closeForm);
addImageForm.addEventListener('submit', handleAddImageFormSubmit);
openImageAddButton.addEventListener('click', openAddImageForm);
closeAddImageFormButton.addEventListener('click', closeAddImageForm);

// card add
function createCard (data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__img');
  const cardTitle = cardElement.querySelector('.card__title');

  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

   // likes button
  const likeButton = cardElement.querySelector('.card__button');
  likeButton.addEventListener('click', handleLikeButton);
  // delete card
  const deleteButton = cardElement.querySelector('.card__delete');
  deleteButton.addEventListener('click', handleDeleteCard);
  // show image
  cardImage.addEventListener('click', () => handleShowImage(data));
  return cardElement;
}
// delete card function
function handleDeleteCard(evt) {
  evt.target.closest('.card').remove();
}
//like function
function handleLikeButton(evt){
  evt.target.classList.toggle('card__button_active');
}
function handleShowImage(data){
  imageElement.src = data.link;
  imageElement.alt = `${data.name}`;
  imageName.textContent = data.name;
  openForm(imageShowForm);
}
function handleImageFormSubmit(evt){
  evt.preventDefault();
  renderCard(
    { name:cardNameInput.value,
      link: cardLinkInput.value,
  },
  cardsContainer );
  closeForm(imageAddForm);
}
function renderCard(data, wrap){
  wrap.preend(createCard(data));

};
//render
initialCards.forEach((data) => {
  rendercard(data,cardsContainer);
});
