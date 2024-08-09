// Создание функции открытия попапа и добавления слушателя закрытия попапа
function openModal(popup) {
  popup.classList.add('popup_is-opened');
  closeModalListener(popup);
}

// Создание функции закрытия попапа и очистки его содержимого
function closeModal(popup){
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
function closeModalListener(popup) {
  // Закрытие попапа по клику на крестик
  const popupCloseButton = popup.querySelector('.popup__close');
  popupCloseButton.addEventListener('click', () => closeModal(popup) );

  // Закрытие попапа по клику на оверлей
  popup.addEventListener('click', function (event) {
    if (event.target === popup) {
      closeModal(popup);
    }
  });

  // Закрытие попапа по нажатию на клавишу Esc
  function escListener(event) {
    if (event.key === 'Escape') {
      closeModal(popup);
      event.target.removeEventListener('keydown', escListener);
    }
  }
  document.addEventListener('keydown', escListener);

}

export { closeModalListener, openModal, closeModal };