import { userNameInput, userJobInput } from "../utils/constants";

export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
promiseAll(){
  return Promise.all([this.getUserData(), this.getInitialCards()])
  // .then(res => console.log(res))
  //   .catch(err => console.error(`Error while executing: ${err}`));
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
  editProfileInfo({username, about}) {
    //PATCH https://around.nomoreparties.co/v1/groupId/users/me
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
      name: username,
      about: about,
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
      headers: this._headers,
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


  deleteCard(cardId) {
    //DELETE https://around.nomoreparties.co/v1/groupId/cards/cardId
    return fetch(`${this._baseUrl}/cards/${cardId}`,
    {  method:"DELETE",
       headers: this._headers})
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
