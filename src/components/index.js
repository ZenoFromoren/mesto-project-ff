import { initialCards } from './cards';
import '../pages/index.css';
import { openModal, closeModal } from './modal.js';
import { createCard, deleteCard, likeCard, closePopupByOverlayClick } from './card.js';

const places = document.querySelector('.places');
const placesList = places.querySelector('.places__list');

const profileEditForm = document.forms['edit-profile'];
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const nameInput = profileEditForm.querySelector('.popup__input_type_name');
const jobInput = profileEditForm.querySelector('.popup__input_type_description');

const newPlaceForm = document.forms['new-place'];
const placeInput = newPlaceForm.querySelector('.popup__input_type_card-name');
const linkInput = newPlaceForm.querySelector('.popup__input_type_url');

export const popups = document.querySelectorAll('.popup');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');

const profileEditButton = document.querySelector('.profile__edit-button');

const popupCloseButtons = document.querySelectorAll('.popup__close');

const profileAddButton = document.querySelector('.profile__add-button');

const handleFormProfileEditSubmit = evt => {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupTypeEdit);
}

const handleFormNewPlaceSubmit = evt => {
  evt.preventDefault();
  placesList.prepend(createCard(placeInput.value, linkInput.value, deleteCard, likeCard, openTypeImagePopup));
  newPlaceForm.reset();
  closeModal(popupTypeNewCard);
}

const openTypeImagePopup = (cardTitle, cardImage) => {
  popupTypeImage.querySelector('.popup__image').src = cardImage;
  popupTypeImage.querySelector('.popup__caption').textContent = cardTitle;
  openModal(popupTypeImage);
}

profileEditForm.addEventListener('submit', handleFormProfileEditSubmit);

newPlaceForm.addEventListener('submit', handleFormNewPlaceSubmit);

profileEditButton.addEventListener('click', () => {
  openModal(popupTypeEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

popupCloseButtons.forEach((button) => {
  button.addEventListener('click', evt => closeModal(evt.target.closest('.popup'))); 
});

profileAddButton.addEventListener('click', () => openModal(popupTypeNewCard));

popups.forEach(popup => popup.addEventListener('click', closePopupByOverlayClick));

initialCards.forEach(card => placesList.append(createCard(card.name, card.link, deleteCard, likeCard, openTypeImagePopup)));