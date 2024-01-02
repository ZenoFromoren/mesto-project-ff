import { deleteCard, setLike, removeLike } from './api.js';

export const handleDeleteCard = (evt, cardId) => {
  deleteCard(cardId)
    .then(evt.target.closest('.card').remove())
    .catch(err => console.log(err)); 
} 

export const likeCard = (evt, cardId) => {
  const likeMethod = evt.target.classList.contains('card__like-button_is-active') ? removeLike : setLike;
  likeMethod(cardId) 
    .then(res => { 
      evt.target.closest('.card').querySelector('.card__numberOfLikes').textContent = res.likes.length; 
      evt.target.classList.toggle('card__like-button_is-active'); 
      evt.target.classList.contains('card__like-button_is-active') ? evt.target.ariaLabel = 'Убрать лайк карточке' : evt.target.ariaLabel = 'Поставить лайк карточке';
     }) 
    .catch(err => console.log(err));
}

export const createCard = (cardTitle, cardImage, handleDeleteCard, likeCard, openTypeImagePopup, cardId, cardOwnerId, cardLikes, profileId) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardIsLiked = cardLikes.some(profile => profileId === profile['_id'])
  const cardNumberOfLikes = cardElement.querySelector('.card__numberOfLikes');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');

  const popupImage = cardElement.querySelector('.card__image');

  cardElement.querySelector('.card__title').textContent = cardTitle;
  popupImage.src = cardImage;
  popupImage.alt = `Фото ${cardTitle}`;
  cardNumberOfLikes.textContent = cardLikes.length;

  cardLikeButton.addEventListener('click', evt => likeCard(evt, cardId));
  
  popupImage.addEventListener('click', () => openTypeImagePopup(cardTitle, cardImage));

  cardOwnerId !== profileId ? cardDeleteButton.remove() : cardDeleteButton.addEventListener('click', evt => handleDeleteCard(evt, cardId));

  cardIsLiked ? cardLikeButton.classList.add('card__like-button_is-active') : cardLikeButton.classList.remove('card__like-button_is-active');
  cardLikeButton.classList.contains('card__like-button_is-active') ? cardLikeButton.ariaLabel = 'Убрать лайк карточке' : cardLikeButton.ariaLabel = 'Поставить лайк карточке';

  return cardElement;
}