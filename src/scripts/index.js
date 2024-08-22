import '../vendor/normalize.css';
import '../vendor/fonts.css';
import '../pages/index.css';
import { addCard } from './card.js';
import { openModal, closeModal } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import { 
  getInitialCards,
  getUserInfo,
  setUserInfo,
  createCard,
  deleteCard,
  addLike,
  deleteLike,
  updateAvatar
} from './api.js';

const placesList = document.querySelector('.places__list');
const popupCardAdd = document.querySelector('.popup_type_new-card');
const popupCardAddForm = popupCardAdd.querySelector('.popup__form');
const popupCardAddFormName = popupCardAddForm.querySelector('.popup__input_type_card-name');
const popupCardAddFormUrl = popupCardAddForm.querySelector('.popup__input_type_url');
const popupImage = document.querySelector('.popup_type_image');
const popupImageImage = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption');
const popupProfileEdit = document.querySelector('.popup_type_edit');
const popupProfileEditForm = popupProfileEdit.querySelector('.popup__form');
const popupProfileEditFormJob = popupProfileEditForm.querySelector('.popup__input_type_description');
const popupProfileEditFormName = popupProfileEditForm.querySelector('.popup__input_type_name');
const popupAvatarEdit = document.querySelector('.popup_avatar_edit');
const popupAvatarEditForm = popupAvatarEdit.querySelector('.popup__form');
const popupAvatarEditFormAvatar = popupAvatarEditForm.querySelector('.popup__input_type_url');
const profileAddButton = document.querySelector('.profile__add-button');
const profileDescription = document.querySelector('.profile__description');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileImage = document.querySelector('.profile__image');

// Здесь положим идентификатор пользователя при первой загрузке страницы
let userId = null;

// Конфигурация валидации форм
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button-disabled',
  inputErrorClass: 'popup__input_type-error',
  errorClass: 'popup__error-visible'
};

// Добавление карточки
function renderCard(cardElement, placesList) {
  placesList.append(cardElement);
}

// Удаление карточки
function removeCard(cardElement, cardId) {
  deleteCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch(err => console.error(`Ошибка при удалении карточки: ${err}`));
}

// Лайк карточки
function likeCard(cardLikeButton, cardLikeCounter, cardId) {
  // проверка текущего состояния лайка
  if (cardLikeButton.classList.contains('card__like-button_is-active')) {
    // Удаляем лайк
    deleteLike(cardId)
    .then(card => {
      cardLikeCounter.textContent = card.likes.length;
      cardLikeButton.classList.toggle('card__like-button_is-active');
    })
    .catch(err => console.error(`Ошибка при удалении лайка: ${err}`));
  } else {
    // Добавляем лайк
    addLike(cardId)
    .then(card => {
      cardLikeCounter.textContent = card.likes.length;
      cardLikeButton.classList.toggle('card__like-button_is-active');
    })
    .catch(err => console.error(`Ошибка при добавлении лайка: ${err}`));
  }
}

// Открытие попапа картинки
function openImage(imageLink, imageAlt) {
  popupImageImage.src = imageLink;
  popupImageImage.alt = imageAlt;
  popupImageCaption.textContent = imageAlt;
  openModal(popupImage);
}

// РАБОТА С ПРОФИЛЕМ ПОЛЬЗОВАТЕЛЯ

// Обработка формы
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  // меняем значение полей профиля на сервере и устанавливаем из ответа на странице
  setUserInfo({
    name: popupProfileEditFormName.value,
    about: popupProfileEditFormJob.value
  })
  .then(userInfo => {
    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
  })
  // Закрываем попап
  closeModal(popupProfileEdit);
  // Убираем валидацию полей формы
  clearValidation(popupProfileEditForm, validationConfig);
  // Очищаем поля формы
  popupProfileEditForm.reset();
}

// редактирование профиля
profileEditButton.addEventListener('click', function () {
  // Заполнение формы текущими значениями
  popupProfileEditFormName.value = profileTitle.textContent;
  popupProfileEditFormJob.value = profileDescription.textContent;
  // Очищаем старую валидацию
  clearValidation(popupProfileEditForm, validationConfig);
  // Включаем валидацию формы
  enableValidation(validationConfig);
  // Открываем попап
  openModal(popupProfileEdit);
});

// listener отправки формы профиля
popupProfileEditForm.addEventListener('submit', handleProfileFormSubmit);

//РАБОТА С АВАТАРОМ ПОЛЬЗОВАТЕЛЯ

// Обработка формы
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  // меняем аватар на сервере и устанавливаем из ответа на странице
  updateAvatar(popupAvatarEditFormAvatar.value)
  .then(userInfo => {
    profileImage.setAttribute('style', `background-image: url(${userInfo.avatar})`);
  })
  // Закрываем попап
  closeModal(popupAvatarEdit);
  // Убираем валидацию полей формы
  clearValidation(popupAvatarEditForm, validationConfig);
  // Очищаем поля формы
  popupAvatarEditForm.reset();
}

// редактирование аватара
profileImage.addEventListener('click', function () {
  // Очищаем старую валидацию
  clearValidation(popupAvatarEditForm, validationConfig);
  // Включаем валидацию формы
  enableValidation(validationConfig);
  // Открываем попап
  openModal(popupAvatarEdit);
});

// listener отправки формы аватара
popupAvatarEditForm.addEventListener('submit', handleAvatarFormSubmit);

// РАБОТА С КАРТОЧКАМИ

// Обработка формы добавления карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  // Добавляем новую карточку на сервер и склаыдваем ответ в переменную

  // Закрываем попап
  closeModal(popupCardAdd);
  // Отрисовываем новую карточку
  createCard({
    name: popupCardAddFormName.value,
    link: popupCardAddFormUrl.value
  })
  .then(card => {
    const cardElement = addCard(card, userId, removeCard, likeCard, openImage);
    placesList.prepend(cardElement);
  })
  // Убираем валидацию полей формы
  clearValidation(popupCardAddForm, validationConfig);
  // Очищаем поля формы
  popupCardAddForm.reset();
}

// добавление новой карточки
profileAddButton.addEventListener('click', function () {
  // Очищаем старую валидацию
  clearValidation(popupCardAddForm, validationConfig);
  // Включаем валидацию формы
  enableValidation(validationConfig);
  // Открываем попап
  openModal(popupCardAdd);
});

// listener отправки формы карточки
popupCardAddForm.addEventListener('submit', handleCardFormSubmit);

// ОБЩИЕ ДЕЙСТВИЯ

// стартовая отрисовка страницы
function renderPage() {
  // делаем асинхронную загрузку данных пользователя и карточек
  Promise.all([getUserInfo(), getInitialCards()])
  .then(([userInfo, cards]) => {
    // отрисовываем профиль и запоминаем userId
    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    userId = userInfo._id;
    profileImage.setAttribute('style', `background-image: url(${userInfo.avatar})`);
    // отрисовываем карточки
    cards.forEach(card => {
      const cardElement = addCard(card, userId, removeCard, likeCard, openImage);
      renderCard(cardElement, placesList);
    });
  })
  .catch(error => {
    console.error('Ошибка при загрузке данных:', error);
  });
}

// запуск отрисовки начальных карточек после загрузки DOM документа
document.addEventListener('DOMContentLoaded', () => {
  renderPage();
  document.querySelectorAll('.popup').forEach(popup => {
    popup.classList.add('popup_is-animated');
  });
});
