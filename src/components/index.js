import '../pages/index.css';
import { openModal, closeModal, closePopupByOverlayClick } from './modal.js';
import { createCard, deleteCard, likeCard } from './card.js';
import { enableValidation, clearValidation } from './validation.js';
import { getInitialCards, APIconfig } from './api.js';

const places = document.querySelector('.places');
const placesList = places.querySelector('.places__list');

const profileEditForm = document.forms['edit-profile'];
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const nameInput = profileEditForm.querySelector('.popup__input_type_name');
const jobInput = profileEditForm.querySelector('.popup__input_type_description');

const newPlaceForm = document.forms['new-place'];
const placeInput = newPlaceForm.querySelector('.popup__input_type_card-name');
const linkInput = newPlaceForm.querySelector('.popup__input_type_url');

const updateAvatarForm = document.forms['update-avatar'];
const avatarLinkInput = updateAvatarForm.querySelector('.popup__input_type_avatar_link');

export const popups = document.querySelectorAll('.popup');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupUpdateAvatar = document.querySelector('.popup_update_avatar');
export const popupDeleteCard = document.querySelector('.popup_delete_card');

const profileEditButton = document.querySelector('.profile__edit-button');

const popupCloseButtons = document.querySelectorAll('.popup__close');

const profileAddButton = document.querySelector('.profile__add-button');

const cardData = getInitialCards();

export const profileData = fetch(`${APIconfig.baseUrl}/users/me`, {
  headers: APIconfig.headers
})
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })

const setprofileData = profileData => {
  profileTitle.textContent = profileData.name;
  profileDescription.textContent = profileData.about;
  profileImage.style.backgroundImage = `url(${profileData.avatar})`;
}

const handleFormProfileEditSubmit = evt => {
  evt.preventDefault();
  popupTypeEdit.querySelector('.button').textContent = 'Сохранение...';
  fetch(`${APIconfig.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: APIconfig.headers,
    body: JSON.stringify({
      name: nameInput.value,
      about: jobInput.value
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json(); 
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(profileData => {
      setprofileData(profileData);
      popupTypeEdit.querySelector('.button').textContent = 'Сохранить';
    })
    .catch(err => console.log(err))
  
  closeModal(popupTypeEdit);
}

const handleFormNewPlaceSubmit = evt => {
  evt.preventDefault();
  newPlaceForm.querySelector('.button').textContent = 'Сохранение...';
  const newCardData = fetch(`${APIconfig.baseUrl}/cards`, {
    method: 'POST',
    headers: APIconfig.headers,
    body: JSON.stringify({
      name: placeInput.value,
      link: linkInput.value
    })
  })
  .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })

    Promise.all([profileData, newCardData])
      .then(([profileData, newCardData]) => {
        placesList.prepend(createCard(newCardData.name, newCardData.link, deleteCard, likeCard, openTypeImagePopup, newCardData, profileData));
        newPlaceForm.querySelector('.button').textContent = 'Сохранить';
      })

  newPlaceForm.reset();
  closeModal(popupTypeNewCard);
}

const handleFormUpdateAvatarSubmit = evt => {
  evt.preventDefault();
  updateAvatarForm.querySelector('.button').textContent = 'Сохранение...';
  fetch(`${APIconfig.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: APIconfig.headers,
    body: JSON.stringify({
      avatar: avatarLinkInput.value
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(profileData => {
      profileImage.style.backgroundImage = `url(${profileData.avatar})`;
      updateAvatarForm.querySelector('.button').textContent = 'Сохранить';
    })
    .catch(err => console.log(err));

  updateAvatarForm.reset();
  closeModal(popupUpdateAvatar);
}

const openTypeImagePopup = (cardTitle, cardImage) => {
  popupTypeImage.querySelector('.popup__image').src = cardImage;
  popupTypeImage.querySelector('.popup__image').alt = `Фото ${cardTitle}`;
  popupTypeImage.querySelector('.popup__caption').textContent = cardTitle;
  openModal(popupTypeImage);
}

profileEditForm.addEventListener('submit', handleFormProfileEditSubmit);

newPlaceForm.addEventListener('submit', handleFormNewPlaceSubmit);

updateAvatarForm.addEventListener('submit', handleFormUpdateAvatarSubmit);

profileEditButton.addEventListener('click', () => {
  clearValidation(profileEditForm, {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });
  openModal(popupTypeEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

popupCloseButtons.forEach(button => button.addEventListener('click', evt => closeModal(evt.target.closest('.popup'))));

profileAddButton.addEventListener('click', () => {
  clearValidation(newPlaceForm, {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });
  openModal(popupTypeNewCard);
})

popups.forEach(popup => popup.addEventListener('click', closePopupByOverlayClick));

profileImage.addEventListener('click', () => {
  clearValidation(updateAvatarForm, {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  })
  openModal(popupUpdateAvatar);
})

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
})

Promise.all([profileData, cardData])
  .then(([profileData, cardData]) => {
    setprofileData(profileData);
    cardData.forEach(cardElement => placesList.append(createCard(cardElement.name, cardElement.link, deleteCard, likeCard, openTypeImagePopup, cardElement, profileData)));
  })
  .catch(err => {
    console.log(err);
  })