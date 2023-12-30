import { profileData, popupDeleteCard } from './index.js';
import { openModal } from './modal.js';
import { APIconfig } from './api.js';

export const deleteCard = (evt, cardId) => {
  fetch(`${APIconfig.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: APIconfig.headers
  })
  evt.target.closest('.card').remove();
} 

export const likeCard = (evt, cardId) => {
  if (evt.target.classList.contains('card__like-button_is-active')) {
    fetch(`${APIconfig.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: APIconfig.headers,
      body: JSON.stringify(profileData)
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
      .then(res => evt.target.closest('.card').querySelector('.card__numberOfLikes').textContent = res.likes.length)
      .catch(err => console.log(err)); 
  }
  else {
    fetch(`${APIconfig.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: APIconfig.headers,
      body: JSON.stringify(profileData)
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(res => evt.target.closest('.card').querySelector('.card__numberOfLikes').textContent = res.likes.length)
      .catch(err => console.log(err));
  }

  evt.target.classList.toggle('card__like-button_is-active');
}

export const createCard = (cardTitle, cardImage, deleteCard, likeCard, openTypeImagePopup, card, profileData) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const isLiked = card.likes.some(profile => {
    return profileData['_id'] === profile['_id'];
  })
  const cardNumberOfLikes = cardElement.querySelector('.card__numberOfLikes');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');

  const popupImage = cardElement.querySelector('.card__image');

  cardElement.querySelector('.card__title').textContent = cardTitle;
  popupImage.src = cardImage;
  popupImage.alt = `Фото ${cardTitle}`;
  cardNumberOfLikes.textContent = card.likes.length;

  cardLikeButton.addEventListener('click', evt => likeCard(evt, card['_id']));
  
  popupImage.addEventListener('click', () => openTypeImagePopup(cardTitle, cardImage));

  if (card.owner['_id'] !== profileData._id) {
    cardDeleteButton.remove();
  }

  if (isLiked) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }
  else {
    cardLikeButton.classList.remove('card__like-button_is-active');
  }

  cardDeleteButton.addEventListener('click', evt => deleteCard(evt, card['_id']));

  return cardElement;
}