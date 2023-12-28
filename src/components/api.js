export const APIconfig = {
  baseUrl: 'https://nomoreparties.co/v1/cohort-magistr-2',
  headers: {
    authorization: 'eaf014af-7c89-4f38-a8a4-e2b61e5fa806',
    'Content-Type': 'application/json'
  }
}

export const getInitialCards = () => {
  return fetch(`${APIconfig.baseUrl}/cards`, {
    headers: APIconfig.headers})
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}