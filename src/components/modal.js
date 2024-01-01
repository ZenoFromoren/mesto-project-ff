import { popups } from './index.js';

const closePopupByEscape = evt => {
  if (evt.key === 'Escape') {
    popups.forEach(popup => {
      if (popup.classList.contains('popup_is-opened')) {
        closeModal(popup);
      }
    })
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
  if (!popupElement.classList.contains('popup_type_image')) {
    popupElement.querySelector('.popup__form').reset();
  }
}