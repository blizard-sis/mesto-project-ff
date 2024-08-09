// Создание функции закрытия определённого попапа
function closePopupListener(popup) {
  const popupCloseButton = popup.querySelector('.popup__close');

  // Закрытие попапа по клику на крестик
  popupCloseButton.addEventListener('click', function () {
    popup.classList.remove('popup_is-opened');
  });

  // Закрытие попапа по клику на оверлей
  popup.addEventListener('click', function (event) {
    if (event.target === popup) {
      popup.classList.remove('popup_is-opened');
    }
  });

  // Закрытие попапа по нажатию на клавишу Esc
  function escListener(event) {
    if (event.key === 'Escape') {
      popup.classList.remove('popup_is-opened');
      event.target.removeEventListener('keydown', escListener);
    }
  }
  document.addEventListener('keydown', escListener);

}

export { closePopupListener };