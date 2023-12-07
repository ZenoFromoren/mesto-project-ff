export const openModal = evt => evt.classList.add('popup_is-opened');

export const closeModal = evt => evt.classList.remove('popup_is-opened');

const popups = document.querySelectorAll('.popup');
popups.forEach(popup => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === popup) {
      closeModal(popup);
    }
  });
})

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    popups.forEach(popup => closeModal(popup));
  }
});