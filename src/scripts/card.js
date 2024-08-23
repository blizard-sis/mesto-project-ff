// Создание карточки
function addCard(card, userId, cardTemplate, deleteCallback, cardLikeCallBack, openImageCallback) {

  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');
  const cardLikeCounter = cardElement.querySelector('.card__like-counter');
  const cardId = card._id;

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;
  cardLikeCounter.textContent = card.likes.length;

  cardImage.addEventListener('click', () => openImageCallback(cardImage.src, cardImage.alt));
  // проверка на разрешение на удаление карточки
  if (card.owner._id !== userId) {
    cardDeleteButton.remove();
  }else{
    cardDeleteButton.addEventListener('click', () => deleteCallback(cardElement, cardId));
  }
  // проверка на наличие лайка
  if (card.likes.some(like => like._id === userId)) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }
  cardLikeButton.addEventListener('click', () => cardLikeCallBack(cardLikeButton, cardLikeCounter, cardId));

  return cardElement;
}

export { addCard };