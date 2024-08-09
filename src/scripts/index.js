import '../vendor/normalize.css';
import '../vendor/fonts.css';
import '../pages/index.css';

import { initialCards } from './cards.js';
import { closePopupListener } from './popup.js';

const placesList = document.querySelector('.places__list');

// Создание карточки
function addCard(imageLink, titleValue, deleteCallback, cardLikeCallBack, imageClickCallback) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');

  cardImage.src = imageLink;
  cardImage.alt = titleValue;
  cardElement.querySelector('.card__title').textContent = titleValue;
  
  cardImage.addEventListener('click', () => imageClickCallback(cardImage.src, cardImage.alt));
  cardDeleteButton.addEventListener('click', () => deleteCallback(cardElement));
  cardLikeButton.addEventListener('click', () => cardLikeCallBack(cardLikeButton));

  return cardElement;
}

// Добавление карточки
function renderCard(cardElement) {
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
function imageClick(imageLink, imageAlt) {
  const popupImage = document.querySelector('.popup_type_image');
  const popupImageImage = popupImage.querySelector('.popup__image');
  const popupCaption = popupImage.querySelector('.popup__caption');

  popupImageImage.src = imageLink;
  popupImageImage.alt = imageAlt;
  popupCaption.textContent = imageAlt;

  popupImage.classList.add('popup_is-opened');

  closePopupListener(popupImage);
}

// Отрисовка начальных карточек
function renderInitialCards(cards) {
  cards.forEach(card => {
    const cardElement = addCard(card.link, card.name, deleteCard, likeCard, imageClick);
    renderCard(cardElement);
  });
}

// Попап редактирование профиля
const profileEditButton = document.querySelector('.profile__edit-button');

profileEditButton.addEventListener('click', function () {
  const popupTypeEdit = document.querySelector('.popup_type_edit');
  popupTypeEdit.classList.add('popup_is-opened');

  closePopupListener(popupTypeEdit);

  // Работа с формой
  const formElement = popupTypeEdit.querySelector('.popup__form');
  const nameInput = formElement.querySelector('.popup__input_type_name');
  const jobInput = formElement.querySelector('.popup__input_type_description');

  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');
  
  // Заполнение формы текущими значениями
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  
  // Обработка формы
  function handleFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    popupTypeEdit.classList.remove('popup_is-opened');
  }

  formElement.addEventListener('submit', handleFormSubmit);
});

// Попап добавление новой карточки
const profileAddButton = document.querySelector('.profile__add-button');

profileAddButton.addEventListener('click', function () {
  const popupCardAdd = document.querySelector('.popup_type_new-card');
  popupCardAdd.classList.add('popup_is-opened');

  closePopupListener(popupCardAdd);

  const formElement = popupCardAdd.querySelector('.popup__form');
  const nameInput = formElement.querySelector('.popup__input_type_card-name');
  const urlInput = formElement.querySelector('.popup__input_type_url');

    // Обработка формы
    function handleFormSubmit(evt) {
      evt.preventDefault();
      popupCardAdd.classList.remove('popup_is-opened');
      const cardElement = addCard(urlInput.value, nameInput.value, deleteCard, likeCard, imageClick);
      placesList.prepend(cardElement);
    }
  
    formElement.addEventListener('submit', handleFormSubmit);
});

// запуск отрисовки начальных карточек после загрузки DOM документа
document.addEventListener('DOMContentLoaded', () => {
  renderInitialCards(initialCards);
});