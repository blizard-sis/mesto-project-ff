// Создание функции открытия попапа и добавления слушателя закрытия попапа
function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', hendlerEscape);
  popup.addEventListener('click', hendlerOverlay);
  popup.addEventListener('click', hendlerCloseButton);
}

// Создание функции закрытия попапа и очистки его содержимого
function closeModal(popup){
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', hendlerEscape);
  popup.removeEventListener('click', hendlerOverlay);
  popup.removeEventListener('click', hendlerCloseButton);
}

// Создание функции закрытия попапа по нажатию на клавишу Esc
function hendlerEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup);
  }
}

// Создание функции закрытия попапа по клику на оверлей
function hendlerOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.target);
  }
}

// Создание функции закрытия попапа по клику на кнопку закрытия
function hendlerCloseButton(evt) {
  if (evt.target.classList.contains('popup__close')) {
    closeModal(evt.target.closest('.popup'));
  }
}

export { openModal, closeModal };