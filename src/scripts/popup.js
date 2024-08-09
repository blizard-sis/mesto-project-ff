function closePopup(popup){
  popup.classList.remove('popup_is-opened');

  // отчищаем картинки и текст в попапе
  const image = popup.querySelector('img');
  if (image) {
    image.src = '';
    image.alt = '';
    popup.querySelector('.popup__caption').textContent = '';
  }

  // отчищаем форму
  const form = popup.querySelector('form');
  if (form) {
    form.reset();
  }
}

// Создание функции закрытия определённого попапа
function closePopupListener(popup) {
  // Закрытие попапа по клику на крестик
  const popupCloseButton = popup.querySelector('.popup__close');
  popupCloseButton.addEventListener('click', () => closePopup(popup) );

  // Закрытие попапа по клику на оверлей
  popup.addEventListener('click', function (event) {
    if (event.target === popup) {
      closePopup(popup);
    }
  });

  // Закрытие попапа по нажатию на клавишу Esc
  function escListener(event) {
    if (event.key === 'Escape') {
      closePopup(popup)
      event.target.removeEventListener('keydown', escListener);
    }
  }
  document.addEventListener('keydown', escListener);

}

export { closePopupListener };