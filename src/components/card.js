import { APIconfig } from './api.js';

export const deleteCard = (evt, cardId) => {
  fetch(`${APIconfig.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: APIconfig.headers
  })
  evt.target.closest('.card').remove();
} 

export const likeCard = evt => evt.target.classList.toggle('card__like-button_is-active');

export const createCard = (cardTitle, cardImage, deleteCard, likeCard, openTypeImagePopup, cardElement, profileData) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardLikeButton = cardElement.querySelector('.card__like-button');
  cardLikeButton.addEventListener('click', likeCard);

  const popupImage = cardElement.querySelector('.card__image');
  popupImage.addEventListener('click', () => openTypeImagePopup(cardTitle, cardImage));

  cardElement.querySelector('.card__title').textContent = cardTitle;
  cardElement.querySelector('.card__image').src = cardImage;
  cardElement.querySelector('.card__image').alt = `Фото ${cardTitle}`;

  const cardDeleteButton = cardElement.querySelector('.card__delete-button');

  if (cardElement.owner['_id'] !== profileData._id) {
    cardDeleteButton.remove();
  }

  cardDeleteButton.addEventListener('click', (evt) => deleteCard(evt, cardElement['_id']));

  return cardElement;
}