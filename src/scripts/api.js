const token = '2fa76ba3-f465-44c9-a325-7938e9fd3a37'
const kohort = 'wff-cohort-21'

const config = {
  baseUrl: 'https://nomoreparties.co/v1/' + kohort,
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  }
}

// Проверка результата запроса
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

// Получение карточек с сервера
function getInitialCards () {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(checkResponse);
} 

// Получение информации о пользователе
function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(checkResponse);
}

// Обновление информации о пользователе
function setUserInfo(data) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: data.name,
      about: data.about
    })
  })
    .then(checkResponse);
}

// Отправка карточки на сервер
function createCard(data) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: data.name,
      link: data.link
    })
  })
    .then(checkResponse);
}

// Удаление карточки
function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(checkResponse);
}

// Установка лайка
function addLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then(checkResponse);
}

// Удаление лайка
function deleteLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(checkResponse);
}

// Обновление сслыки на аватар пользователя
function updateAvatar(url) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: url
    })
  })
    .then(checkResponse);
}

export {
  getInitialCards,
  getUserInfo,
  setUserInfo,
  createCard,
  deleteCard,
  addLike,
  deleteLike,
  updateAvatar
};