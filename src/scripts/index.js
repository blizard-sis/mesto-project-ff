import '../vendor/normalize.css';
import '../vendor/fonts.css';
import '../pages/index.css';

import { renderInitialCards, addCard, deleteCard, likeCard, imageClick } from './cards.js';
import { openModal } from './modal.js';

const placesList = document.querySelector('.places__list');


// редактирование профиля
const profileEditButton = document.querySelector('.profile__edit-button');

profileEditButton.addEventListener('click', function () {
  const popupTypeEdit = document.querySelector('.popup_type_edit');
  openModal(popupTypeEdit);

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

// добавление новой карточки
const profileAddButton = document.querySelector('.profile__add-button');

profileAddButton.addEventListener('click', function () {
  const popupCardAdd = document.querySelector('.popup_type_new-card');
  openModal(popupCardAdd);

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
  renderInitialCards(placesList);
  document.querySelectorAll('.popup').forEach(popup => {
    popup.classList.add('popup_is-animated');
  });
});