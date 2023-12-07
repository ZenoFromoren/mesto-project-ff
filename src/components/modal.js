const closePopupByEscape = evt => {
  if (evt.key === 'Escape') {
    popups.forEach(popup => closeModal(popup));
  }
}

export const openModal = evt => {
  evt.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupByEscape);
} 

export const closeModal = evt => {
  evt.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupByEscape);
}

const popups = document.querySelectorAll('.popup');
popups.forEach(popup => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === popup) {
      closeModal(popup);
    }
  });
})