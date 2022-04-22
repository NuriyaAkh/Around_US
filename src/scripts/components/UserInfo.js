export default class UserInfo {
  constructor({ userName, userOccupation }) {
    this._profileName = document.querySelector(userName);
    this._profileJob = document.querySelector(userOccupation);

  }
  //to display the user data in the open form
  getUserInfo() {
    const userInputName = this._profileName.textContent;
    const userInputOccupation = this._profileJob.textContent;

    return { userInputName, userInputOccupation};
  }

  //takes new user data and adds it on the page
  setUserInfo(data) {

    this._profileName.textContent = data.userName;
    this._profileJob.textContent = data.userOccupation;
  }
}
