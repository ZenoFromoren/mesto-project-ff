const closePopupByEscape = evt => {
  if (evt.key === 'Escape') {
    closeModal(document.querySelector('.popup_is-opened'));
  }
}

export const closePopupByOverlayClick = evt => {
  if (evt.target.classList.contains('popup')) {
    closeModal(evt.target);
  }
}

export const openModal = popupElement => {
  popupElement.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupByEscape);
} 

export const closeModal = popupElement => {
  popupElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupByEscape);
}