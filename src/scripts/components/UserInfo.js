export default class UserInfo {
  constructor({ userName, userOccupation }) {

    this._profileName = document.querySelector('.profile__name');
    console.log(this._profileName);
    this._profileJob = profileJob = document.querySelector('.profile__about');
  }
  //to display the user data in the open form
  getUserInfo() {
    const profileNameElement = this._profileName.textContent;
    const profileOccupationElement = this._profileJob.textContent;
    return profileNameElement, profileOccupationElement;
  }
  //takes new user data and adds it on the page
  setUserInfo(data) {

    this._profileName = data.userName;
    this._profileJob = data.userOccupation;
  }
}
/* // profile DOM nodes updates info of the profile
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__about');

// form data and elements
const inputName = editProfileForm.querySelector('#username');
const inputJob = editProfileForm.querySelector('#about'); */
