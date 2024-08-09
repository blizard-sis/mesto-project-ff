const placesList = document.querySelector('.places__list');

// @todo: Темплейт карточки
function addCard(imageLink, titleValue, deleteCallback) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeButton = cardElement.querySelector('.card__like-button');

  cardElement.querySelector('.card__image').src = imageLink;
  cardElement.querySelector('.card__image').alt = titleValue;
  cardElement.querySelector('.card__title').textContent = titleValue;

  cardDeleteButton.addEventListener('click', function () {
    deleteCallback(cardElement);
    //cardElement.remove();
  });

  cardLikeButton.addEventListener('click', function () {
    cardLikeButton.classList.toggle('card__like-button_is-active');
  });

  return cardElement;
}

// @todo: DOM узлы

// @todo: Функция создания карточки
function renderCard(cardElement) {
  placesList.append(cardElement);
}
// @todo: Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}
// @todo: Вывести карточки на страницу
function renderInitialCards(cards) {
  cards.forEach(card => {
    const cardElement = addCard(card.link, card.name, deleteCard);
    renderCard(cardElement);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderInitialCards(initialCards);
});