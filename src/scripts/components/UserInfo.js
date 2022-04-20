export default class UserInfo {
  constructor({ userName, userOccupation }) {
    this._profileName = document.querySelector(userName);
    //console.log(this._profileName);
    this._profileJob = document.querySelector(userOccupation);
   // console.log(this._profileJob);
  }
  //to display the user data in the open form
  getUserInfo() {
    this._inputName = this._profileName.textContent;
    this._inputOccupation = this._profileJob.textContent;

    return this._inputName, this._inputOccupation;
  }

  //takes new user data and adds it on the page
  setUserInfo(data) {
    
    this._profileName.textContent = data.userName;
    this._profileJob.textContent = data.userOccupation;
  }
}
