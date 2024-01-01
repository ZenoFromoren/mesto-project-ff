import { profileData } from './index.js';
import { deleteCard, setLike, removeLike } from './api.js';

export const handleDeleteCard = (evt, cardId) => {
  deleteCard(cardId)
    .then(evt.target.closest('.card').remove())
    .catch(err => console.log(err)); 
} 

export const likeCard = (evt, cardId) => {
  if (evt.target.classList.contains('card__like-button_is-active')) {
    removeLike(cardId, profileData)
      .then(res => {
        evt.target.closest('.card').querySelector('.card__numberOfLikes').textContent = res.likes.length;
        evt.target.classList.toggle('card__like-button_is-active');
      })
      .catch(err => console.log(err)); 
  }
  else {
    setLike(cardId, profileData)
      .then(res => {
        evt.target.closest('.card').querySelector('.card__numberOfLikes').textContent = res.likes.length;
        evt.target.classList.toggle('card__like-button_is-active');
      })
      .catch(err => console.log(err));
  }
}

export const createCard = (cardTitle, cardImage, handleDeleteCard, likeCard, openTypeImagePopup, card, profileData) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardIsLiked = card.likes.some(profile => profileData['_id'] === profile['_id'])
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

  cardIsLiked ? cardLikeButton.classList.add('card__like-button_is-active') : cardLikeButton.classList.remove('card__like-button_is-active');

  cardDeleteButton.addEventListener('click', evt => handleDeleteCard(evt, card['_id']));

  return cardElement;
}