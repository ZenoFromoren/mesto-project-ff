// @todo: Темплейт карточки
const places = document.querySelector('.places');
const placesList = places.querySelector('.places__list');

const deleteCard = evt => evt.target.closest('.card').remove();

const createCard = (cardTitle, cardImage, deleteCard) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  
  cardElement.querySelector('.card__title').textContent = cardTitle;
  cardElement.querySelector('.card__image').src = cardImage;
  cardElement.querySelector('.card__image').alt = `Фото ${cardTitle}`;

  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  cardDeleteButton.addEventListener('click', deleteCard);

  return cardElement;
}

initialCards.forEach(card => placesList.append(createCard(card.name, card.link, deleteCard)));

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу