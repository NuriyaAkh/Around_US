const profileEditButton = document.querySelector(".profile__button-name-edit");
const editFormCloseButton = document.querySelector('.form__button-close');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__about');

const editForm = document.querySelector('.form');

const formInputName = editForm.querySelector('#username');
const formInputJob = editForm.querySelector('#about');
const formSaveButton =document.querySelector('.form__button');


function handleProfileFormSubmit(evt) {
    // This line stops the browser from
    // submitting the form in the default way.
    evt.preventDefault();
    // Having done so, we can define our own way of submitting the form.
    // We'll explain it in more detail later.

    // Let's find the form fields in the DOM
    formInputName = // Use querySelector()
    formInputJob = // Use querySelector()

    // Get the values of each field from the corresponding value property

    // Select elements where the field values will be entered

    // Insert new values using the textContent
    // property of the querySelector() method
}

// Connect the handler to the form:
// it will watch the submit event
formElement.addEventListener('submit', handleProfileFormSubmit);
