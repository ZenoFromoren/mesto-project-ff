import '../pages/index.css';
import { openModal, closeModal, closePopupByOverlayClick } from './modal.js';
import { createCard, handleDeleteCard, likeCard } from './card.js';
import { enableValidation, clearValidation } from './validation.js';
import { getInitialCards, getProfileData, changeProfileData, addNewPlace, changeAvatar } from './api.js';

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

const profileEditButton = document.querySelector('.profile__edit-button');

const popupCloseButtons = document.querySelectorAll('.popup__close');

const profileAddButton = document.querySelector('.profile__add-button');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const cardDataPromise = getInitialCards();

const profileDataPromise = getProfileData();

const setprofileData = profileData => {
  profileTitle.textContent = profileData.name;
  profileDescription.textContent = profileData.about;
  profileImage.style.backgroundImage = `url(${profileData.avatar})`;
}

const handleFormProfileEditSubmit = evt => {
  evt.preventDefault();
  popupTypeEdit.querySelector('.button').textContent = 'Сохранение...';
  changeProfileData(nameInput.value, jobInput.value)
    .then(profileData => {
      setprofileData(profileData);
      closeModal(popupTypeEdit);
    })
    .catch(err => console.log(err))
    .finally(() => profileEditForm.querySelector('.button').textContent = 'Сохранить')
}

const handleFormNewPlaceSubmit = evt => {
  evt.preventDefault();
  newPlaceForm.querySelector('.button').textContent = 'Сохранение...';
  addNewPlace(placeInput.value, linkInput.value)
    .then(newCardData => {
      placesList.prepend(createCard(newCardData.name, newCardData.link, handleDeleteCard, likeCard, openTypeImagePopup, newCardData['_id'], newCardData.owner['_id'], newCardData.likes, profileId));
      newPlaceForm.reset();
      closeModal(popupTypeNewCard);
    })
    .then()
    .catch(err => console.log(err))
    .finally(() => newPlaceForm.querySelector('.button').textContent = 'Сохранить')
}

const handleFormUpdateAvatarSubmit = evt => {
  evt.preventDefault();
  updateAvatarForm.querySelector('.button').textContent = 'Сохранение...';
  changeAvatar(avatarLinkInput.value)
    .then(profileData => {
      profileImage.style.backgroundImage = `url(${profileData.avatar})`;
      updateAvatarForm.reset();
      closeModal(popupUpdateAvatar);
    })
    .catch(err => console.log(err))
    .finally(() => updateAvatarForm.querySelector('.button').textContent = 'Сохранить')
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
  clearValidation(profileEditForm, validationConfig);
  openModal(popupTypeEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

popupCloseButtons.forEach(button => button.addEventListener('click', evt => closeModal(evt.target.closest('.popup'))));

profileAddButton.addEventListener('click', () => {
  newPlaceForm.reset();
  clearValidation(newPlaceForm, validationConfig);
  openModal(popupTypeNewCard);
})

popups.forEach(popup => popup.addEventListener('click', closePopupByOverlayClick));

profileImage.addEventListener('click', () => {
  updateAvatarForm.reset();
  clearValidation(updateAvatarForm, validationConfig)
  openModal(popupUpdateAvatar);
})

enableValidation(validationConfig)

let profileId

Promise.all([profileDataPromise, cardDataPromise])
  .then(([profileData, cardData]) => {
    profileId = profileData['_id'];
    setprofileData(profileData);
    cardData.forEach(cardElement => placesList.append(createCard(cardElement.name, cardElement.link, handleDeleteCard, likeCard, openTypeImagePopup, cardElement['_id'], cardElement.owner['_id'], cardElement.likes, profileId)));
  })
  .catch(err => console.log(err))