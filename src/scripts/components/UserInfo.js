export default class UserInfo {
  constructor({ userName, userOccupation }) {
    this._profileName = document.querySelector(userName);
    this._profileJob = document.querySelector(userOccupation);
  }

  getUserInfo() {
    return {
              userInputName: this._profileName.textContent,
              userInputJob: this._profileJob.textContent
    }

  }

  setUserInfo(data) {
    this._profileName.textContent = data.userName;
    this._profileJob.textContent = data.userOccupation;
  }
}
