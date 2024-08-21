import '../vendor/normalize.css';
import '../vendor/fonts.css';
import '../pages/index.css';
import { addCard } from './card.js';
import { openModal, closeModal } from './modal.js';
import { initialCards } from './cards.js';
import { enableValidation, clearValidation } from './validation.js';

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
const profileAddButton = document.querySelector('.profile__add-button');
const profileDescription = document.querySelector('.profile__description');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');

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
function deleteCard(cardElement) {
  cardElement.remove();
}

// Лайк карточки
function likeCard(cardElement) {
  cardElement.classList.toggle('card__like-button_is-active');
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
  // меняем значение полей профиля на странице
  profileTitle.textContent = popupProfileEditFormName.value;
  profileDescription.textContent = popupProfileEditFormJob.value;
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

// РАБОТА С КАРТОЧКАМИ

// Обработка формы добавления карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  // Добавляем новую карточку
  const cardElement = addCard(popupCardAddFormUrl.value, popupCardAddFormName.value, deleteCard, likeCard, openImage);
  // Закрываем попап
  closeModal(popupCardAdd);
  // Убираем валидацию полей формы
  clearValidation(popupProfileEditForm, validationConfig);
  // Очищаем поля формы
  popupCardAddForm.reset();
  // Отрисовываем новую карточку
  placesList.prepend(cardElement);
}

// добавление новой карточки
profileAddButton.addEventListener('click', function () {
  // Очищаем старую валидацию
  clearValidation(popupProfileEditForm, validationConfig);
  // Включаем валидацию формы
  enableValidation(validationConfig);
  // Открываем попап
  openModal(popupCardAdd);
});

// listener отправки формы карточки
popupCardAddForm.addEventListener('submit', handleCardFormSubmit);

// Отрисовка начальных карточек
function renderInitialCards(placesList) {
  initialCards.forEach(card => {
    const cardElement = addCard(card.link, card.name, deleteCard, likeCard, openImage);
    renderCard(cardElement, placesList);
  });
}

// Включение валидации форм

// запуск отрисовки начальных карточек после загрузки DOM документа
document.addEventListener('DOMContentLoaded', () => {
  renderInitialCards(placesList);
  document.querySelectorAll('.popup').forEach(popup => {
    popup.classList.add('popup_is-animated');
  });
});
