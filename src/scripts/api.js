
const configAPI = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-29',
    headers: {
      authorization: '5049aaed-2f06-4c50-beab-464605c8f1c5',
      'Content-Type': 'application/json'
    },
    token: '5049aaed-2f06-4c50-beab-464605c8f1c5',
}

//Здравствуйте, надеюсь правильно понял, что .catch нужно было перенести непосредственно в те места, где и вызываются функции API, после всех операций с данными 

const getResponseData = (res) => {
  if (!res.ok) {
    throw new Error(`Ошибка: ${res.status}`); 
  }
  return res.json();
} 

const requestProfileData = () => {
    return fetch(`${configAPI.baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        authorization: configAPI.token,
      }
    })
    .then(res => {
      return getResponseData(res);
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
    return getResponseData(res);
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
    return getResponseData(res);
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
  .then(res => {
    return getResponseData(res);
})
}

const deleteLikeAPI = (cardId) => {
  return fetch (`${configAPI.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: configAPI.token,
    },
  })
  .then(res => {
    return getResponseData(res);
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
    return getResponseData(res);
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
    return getResponseData(res);
  })
}

export { postCard, patchAvatar, deleteLikeAPI, putLikeAPI, requestCards, postProfileData, requestProfileData, deleteCardAPI }
