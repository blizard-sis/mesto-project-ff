// Создание карточки
function addCard(imageLink, titleValue, deleteCallback, cardLikeCallBack, openImageCallback) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');

  cardImage.src = imageLink;
  cardImage.alt = titleValue;
  cardElement.querySelector('.card__title').textContent = titleValue;
  
  cardImage.addEventListener('click', () => openImageCallback(cardImage.src, cardImage.alt));
  cardDeleteButton.addEventListener('click', () => deleteCallback(cardElement));
  cardLikeButton.addEventListener('click', () => cardLikeCallBack(cardLikeButton));

  return cardElement;
}

export { addCard };