import { userInputJob, userInputName } from "../utils/constants";

export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: "66d060c3-a92b-49d0-add5-d7e29bf411c9",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // if the server returns an error, reject the promise
        return Promise.reject(`Error: ${res.status}`);
      })

      .catch((err) => {
        console.log(err); // log the error to the console
      });
  }
  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: "66d060c3-a92b-49d0-add5-d7e29bf411c9",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // if the server returns an error, reject the promise
        return Promise.reject(`Error: ${res.status}`);
      })

      .catch((err) => {
        console.log(err); // log the error to the console
      });
  }
  editProfileInfo() {
    //PATCH https://around.nomoreparties.co/v1/groupId/users/me
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: "66d060c3-a92b-49d0-add5-d7e29bf411c9",
      },
    });
    body: JSON.stringify({
      name: userInputName,
      about: userInputJob,
    });
  }
  addNewCard() {
    //POST https://around.nomoreparties.co/v1/groupId/cards
  }
  countLikesData() {}
  deleteCard() {
    //DELETE https://around.nomoreparties.co/v1/groupId/cards/cardId
  }
  addLike() {
    //PUT https://around.nomoreparties.co/v1/groupId/cards/likes/cardId
  }
  removeLike() {
    //DELETE https://around.nomoreparties.co/v1/groupId/cards/likes/cardId
  }
  editPrifilePicture() {
    //PATCH https://around.nomoreparties.co/v1/groupId/users/me/avatar
  }
}
