// @todo: Темплейт карточки
const places = document.querySelector('.places');
const placesList = places.querySelector('.places__list');

const deleteCard = evt => evt.target.parentElement.remove();

const addCard = (cardTitle, cardImage, deleteCard) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  
  cardElement.querySelector('.card__title').textContent = cardTitle;
  cardElement.querySelector('.card__image').src = cardImage;

  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  cardDeleteButton.addEventListener('click', deleteCard);

  return cardElement;
}

for (let i = 0; i < initialCards.length; i++) {
  placesList.append(addCard(initialCards[i].name, initialCards[i].link, deleteCard));
}

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу