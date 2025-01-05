
const configAPI = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-29',
    headers: {
      authorization: '5049aaed-2f06-4c50-beab-464605c8f1c5',
      'Content-Type': 'application/json'
    },
    token: '5049aaed-2f06-4c50-beab-464605c8f1c5',
}


const requestProfileData = () => {
    return fetch(`${configAPI.baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        authorization: configAPI.token,
      }
    })
    .then(res => {
      return res.json();
    })
    .catch (err => {
      console.log(`Ошибка: ${err}`);
    })
  };

  const requestCards =  () => {
    return fetch(`${configAPI.baseUrl}/cards`, {
    method: 'GET',
    headers: {
      authorization: configAPI.token,
    }
  })
  .then(res => {
    if(res.ok) return res.json();
  })
  .catch (err => {
    console.log(`Ошибка: ${err}`);
  })
}

const postProfileData = (nameInput, aboutInput) => {
  return fetch(`${configAPI.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: 
      configAPI.headers
    ,
    body: JSON.stringify({
      name: `${nameInput.value}`,
      about: `${aboutInput.value}`
    })
  })
  .then(res => {
    if(res.ok) return res.json();
  })
  .catch(err => {
    console.log(`Ошибка при обновлении данных профиля: ${err}`);
  })
}



const deleteCardAPI = (cardId) => {
  return fetch (`${configAPI.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: configAPI.headers,
  })
}

const putLikeAPI = (cardId) => {
  return fetch (`${configAPI.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: configAPI.token,
    },
  })
}

const deleteLikeAPI = (cardId) => {
  return fetch (`${configAPI.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: configAPI.token,
    },
  })
}

const patchAvatar = (imgURL) => {
  return fetch(`${configAPI.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: configAPI.headers,
    body: JSON.stringify({
      avatar: `${imgURL}`,
    })
  })
  .then(res => {
    if(res.ok) return res.json();
  })
  .catch(err => {
    console.log(`Ошибка при обновлении картинки профиля: ${err}`);
  })
}

const postCard = (cardData) => {
  return fetch(`${configAPI.baseUrl}/cards`, {
    method: 'POST',
    headers: configAPI.headers,
    body: JSON.stringify({
      name: `${cardData.name}`,
      link: `${cardData.link}`,
    })
  })
  .then(res => {
    if(res.ok) return res.json();
  })
  .catch(err => {
    console.log(`Ошибка при публикации карточки: ${err}`);
  })
}

export { postCard, patchAvatar, deleteLikeAPI, putLikeAPI, requestCards, postProfileData, requestProfileData, deleteCardAPI, configAPI }
