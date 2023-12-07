import { initialCards } from "./cards";
import './index.css';
import { openModal, closeModal } from './modal.js';
import { createCard, deleteCard, likeCard } from './card.js';

const places = document.querySelector('.places');
const placesList = places.querySelector('.places__list');

const profileEditForm = document.forms['edit-profile'];
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const nameInput = profileEditForm.querySelector('.popup__input_type_name');
const jobInput = profileEditForm.querySelector('.popup__input_type_description');
const handleFormProfileEditSubmit = evt => {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(evt.target.closest('.popup'));
}
profileEditForm.addEventListener('submit', handleFormProfileEditSubmit);

const newPlaceForm = document.forms['new-place'];
const placeInput = newPlaceForm.querySelector('.popup__input_type_card-name');
const linkInput = newPlaceForm.querySelector('.popup__input_type_url');
const handleFormNewPlaceSubmit = evt => {
  evt.preventDefault();
  placesList.prepend(createCard(placeInput.value, linkInput.value, deleteCard, likeCard, openTypeImagePopup));
  placeInput.value = '';
  linkInput.value = '';
  closeModal(evt.target.closest('.popup'));
}
newPlaceForm.addEventListener('submit', handleFormNewPlaceSubmit);

const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');

const profileEditButton = document.querySelector('.profile__edit-button');
profileEditButton.addEventListener('click', () => {
  openModal(popupTypeEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}); 

const popupCloseButtons = document.querySelectorAll('.popup__close');
popupCloseButtons.forEach((button) => {
  button.addEventListener('click', (evt) => closeModal(evt.target.closest('.popup'))); 
});

const profileAddButton = document.querySelector('.profile__add-button');
profileAddButton.addEventListener('click', () => openModal(popupTypeNewCard));

export const openTypeImagePopup = evt => {
  popupTypeImage.querySelector('.popup__image').src = evt.target.src;
  popupTypeImage.querySelector('.popup__caption').textContent = evt.target.closest('.card').querySelector('.card__title').textContent;
  openModal(popupTypeImage);
}

initialCards.forEach(card => placesList.append(createCard(card.name, card.link, deleteCard, likeCard, openTypeImagePopup)));