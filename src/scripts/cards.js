import { openModal } from './modal.js';

const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

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
function imageClick(imageLink, imageAlt) {
  const popupImage = document.querySelector('.popup_type_image');
  const popupImageImage = popupImage.querySelector('.popup__image');
  const popupCaption = popupImage.querySelector('.popup__caption');

  popupImageImage.src = imageLink;
  popupImageImage.alt = imageAlt;
  popupCaption.textContent = imageAlt;
  openModal(popupImage);
}

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

// Отрисовка начальных карточек
function renderInitialCards(placesList) {
  initialCards.forEach(card => {
    const cardElement = addCard(card.link, card.name, deleteCard, likeCard, imageClick);
    renderCard(cardElement, placesList);
  });
}

export { renderInitialCards, addCard, deleteCard, likeCard, imageClick };