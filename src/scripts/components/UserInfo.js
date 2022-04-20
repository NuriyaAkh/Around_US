export default class UserInfo {
  constructor({ userName, userOccupation }) {
    this._profileName = document.querySelector(userName);
    this._profileOccupation = document.querySelector(userOccupation);
  }
  //to display the user data in the open form
  getUserInfo() {
    const profileNameElement = this._profileName.textContent;
    const profileOccupationElement = this._profileOccupation.textContent;
    return profileNameElement, profileOccupationElement;
  }
  //takes new user data and adds it on the page
  setUserInfo(data) {
    this._profileNameElement.textContent = data.userName;
    this._profileOccupationElement.textContent = data.userOccupation;
  }
}
