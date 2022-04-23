export default class UserInfo {
  constructor({ userName, userOccupation }) {
    this._profileName = document.querySelector(userName);
    this._profileJob = document.querySelector(userOccupation);
  }

  getUserInfo() {
    const userInputName = this._profileName.textContent;
    const userInputJob = this._profileJob.textContent;

    return { userInputName, userInputJob };
  }

  setUserInfo(data) {
    this._profileName.textContent = data.userName;
    this._profileJob.textContent = data.userOccupation;
  }
}
