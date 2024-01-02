export const APIconfig = {
  baseUrl: 'https://nomoreparties.co/v1/cohort-magistr-2',
  headers: {
    authorization: 'eaf014af-7c89-4f38-a8a4-e2b61e5fa806',
    'Content-Type': 'application/json'
  }
}

export const request = (endpoint, options = {}) => {
  return fetch(`${APIconfig.baseUrl}/${endpoint}`, {
    method: "GET",
    headers: APIconfig.headers,
    ...options,
  }) 
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export const getInitialCards = () => request('cards');

export const getProfileData = () => request('users/me');

export const changeProfileData = (name, about) => request('users/me', {
  method: 'PATCH',
  body: JSON.stringify({
    name,
    about
  })
})

export const addNewPlace = (name, link) => request('cards', {
  method: 'POST',
  body: JSON.stringify({
    name,
    link
  })
})

export const changeAvatar = avatar => request('users/me/avatar', {
  method: 'PATCH',
  body: JSON.stringify({
    avatar
  })
})

export const deleteCard = cardId => request(`cards/${cardId}`, {
  method: 'DELETE'
})

export const setLike = cardId => request(`cards/likes/${cardId}`, {
  method: 'PUT'
})

export const removeLike = cardId => request(`cards/likes/${cardId}`, {
  method: 'DELETE'
})