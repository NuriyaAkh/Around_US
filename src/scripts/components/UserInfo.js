export default class UserInfo {
  constructor({userNameSelector, userOccupationSelector, userPictureSelector}) {
    this._profileName = document.querySelector(userNameSelector);
    this._profileJob = document.querySelector(userOccupationSelector);
    this._userPicture = document.querySelector(userPictureSelector);
  }

  getUserInfo() {
    return {
      userInputName: this._profileName.textContent,
      userInputJob: this._profileJob.textContent
    };
  }

  setUserInfo({userInputName, userInputJob, userAvatar}) {
    this._profileName.textContent = userInputName;
    this._profileJob.textContent = userInputJob;
    this._userPicture.src = userAvatar;
  }
}
