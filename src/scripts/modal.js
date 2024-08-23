// Создание функции для листенера закрытия попапа по крестику и оверлею
function closeListener(evt) {
  if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')) {
    closeModal(evt.currentTarget);
  }
}

// Создание функции закрытия попапа по нажатию на клавишу Esc
function hendlerEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup);
  }
}

// Создание функции открытия попапа и добавления слушателя закрытия попапа
function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', hendlerEscape);
  popup.addEventListener('click', closeListener);
}

// Создание функции закрытия попапа и очистки его содержимого
function closeModal(popup){
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', hendlerEscape);
  popup.removeEventListener('click', closeListener);
}



export { openModal, closeModal };