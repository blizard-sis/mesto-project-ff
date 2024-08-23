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

const cardTemplate = document.querySelector('#card-template').content;
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
  // получаем кнопку формы и меняем текст
  const submitButton = popupProfileEditForm.querySelector('.popup__button');
  submitButton.textContent = 'Сохранение...';
  // меняем значение полей профиля на сервере и устанавливаем из ответа на странице
  setUserInfo({
    name: popupProfileEditFormName.value,
    about: popupProfileEditFormJob.value
  })
  .then(userInfo => {
    // подменяем текст на странице из ответа
    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    // Закрываем попап
    closeModal(popupProfileEdit);
    // Очищаем поля формы
    popupProfileEditForm.reset();
  })
  .catch(err => console.error(`Ошибка при обновлении профиля: ${err}`))
  .finally(() => {
    // вертаем кнопку взад
    submitButton.textContent = 'Сохранить';
    // Убираем валидацию полей формы
    clearValidation(popupProfileEditForm, validationConfig);
  });
}

// Открытие формы профиля
function handleProfileFormOpen() {
  // Заполнение формы текущими значениями
  popupProfileEditFormName.value = profileTitle.textContent;
  popupProfileEditFormJob.value = profileDescription.textContent;
  // Очищаем старую валидацию
  clearValidation(popupProfileEditForm, validationConfig);
  // Открываем попап
  openModal(popupProfileEdit);
}

// редактирование профиля
profileEditButton.addEventListener('click', handleProfileFormOpen);

// listener отправки формы профиля
popupProfileEditForm.addEventListener('submit', handleProfileFormSubmit);

//РАБОТА С АВАТАРОМ ПОЛЬЗОВАТЕЛЯ

// Обработка формы
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  // получаем кнопку формы и меняем текст
  const submitButton = popupAvatarEditForm.querySelector('.popup__button');
  submitButton.textContent = 'Сохранение...';
  // меняем аватар на сервере и устанавливаем из ответа на странице
  updateAvatar(popupAvatarEditFormAvatar.value)
  .then(userInfo => {
    profileImage.setAttribute('style', `background-image: url(${userInfo.avatar})`);
    // Закрываем попап
    closeModal(popupAvatarEdit);
    // Очищаем поля формы
    popupAvatarEditForm.reset();
  })
  .catch(err => console.error(`Ошибка при обновлении аватара: ${err}`))
  .finally(() => {
    // вертаем кнопку взад
    submitButton.textContent = 'Сохранить';
    // Убираем валидацию полей формы
    clearValidation(popupAvatarEditForm, validationConfig);
  });
}

// Открытие формы аватара
function handleAvatarFormOpen() {
  // Очищаем старую валидацию
  clearValidation(popupAvatarEditForm, validationConfig);
  // Открываем попап
  openModal(popupAvatarEdit);
}

// редактирование аватара
profileImage.addEventListener('click', handleAvatarFormOpen);

// listener отправки формы аватара
popupAvatarEditForm.addEventListener('submit', handleAvatarFormSubmit);

// РАБОТА С КАРТОЧКАМИ

// Обработка формы добавления карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  // получаем кнопку формы и меняем текст
  const submitButton = popupCardAddForm.querySelector('.popup__button');
  submitButton.textContent = 'Содание...';
  // Отрисовываем новую карточку
  createCard({
    name: popupCardAddFormName.value,
    link: popupCardAddFormUrl.value
  })
  .then(card => {
    // Закрываем попап
    closeModal(popupCardAdd);
    const cardElement = addCard(card, userId, cardTemplate, removeCard, likeCard, openImage);
    placesList.prepend(cardElement);
    // Очищаем поля формы
    popupCardAddForm.reset();
  })
  .catch(err => console.error(`Ошибка при добавлении карточки: ${err}`))
  .finally(() => {
    submitButton.textContent = 'Создать';
    // Убираем валидацию полей формы
    clearValidation(popupCardAddForm, validationConfig);
  });
}

// Открытие формы добавления карточки
function handleCardFormOpen() {
  // Очищаем старую валидацию
  clearValidation(popupCardAddForm, validationConfig);
  // Открываем попап
  openModal(popupCardAdd);
}

// добавление новой карточки
profileAddButton.addEventListener('click', handleCardFormOpen);

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
      const cardElement = addCard(card, userId, cardTemplate, removeCard, likeCard, openImage);
      renderCard(cardElement, placesList);
    });
  })
  .catch(error => {
    console.error('Ошибка при загрузке данных:', error);
  });
}

// запуск отрисовки начальных карточек после загрузки DOM документа
document.addEventListener('DOMContentLoaded', () => {
  // Отрисовка страницы
  renderPage();
  // Добавляем анимацию попапам
  document.querySelectorAll('.popup').forEach(popup => {
    popup.classList.add('popup_is-animated');
  });
  // Включаем валидацию формы
  enableValidation(validationConfig);
});
