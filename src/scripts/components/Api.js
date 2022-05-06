import { userNameInput, userJobInput } from "../utils/constants";

export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers})
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
    return fetch(`${this._baseUrl}/users/me`,
      { headers: this._headers}
    )
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
  editProfileInfo({userInputName, userInputJob}) {
    //PATCH https://around.nomoreparties.co/v1/groupId/users/me
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
      name: userInputName,
      about: userInputJob,
    })
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
  addNewCard({name,link}) {
    //POST https://around.nomoreparties.co/v1/groupId/cards
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: "66d060c3-a92b-49d0-add5-d7e29bf411c9",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
      name,
      link,
    })
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
