export { createCard, deleteCard, likeCard };
import { putLikeAPI, deleteLikeAPI, deleteCardAPI } from "./api.js";

function createCard(
  cardData,
  cardTemplate,
  deleteCard,
  likeCard,
  handleImageClick,
  userId
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".card__like-counter");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeCounter.textContent = cardData.likes.length;

  // Проверка для включения/отключения кнопки удаления карточки
  if (cardData.owner._id === userId) {
    deleteButton.addEventListener("click", () => {
      deleteCard(cardElement, cardData._id);
    });
  } else {
    deleteButton.classList.add("card__delete-button-disabled");
  }
  //Проверка на лайки при обновлении страницы
  cardData.likes.forEach((like) => {
    if (like._id === userId) {
      likeButton.classList.add("card__like-button_is-active");
    }
  });
  //Обработчик лайков
  likeButton.addEventListener("click", () => {
    likeCard(cardElement, cardData._id);
  });

  cardImage.addEventListener("click", handleImageClick);

  return cardElement;
}

const likeCard = (card, cardId) => {
  const likeButton = card.querySelector(".card__like-button");
  const likeCounter = card.querySelector(".card__like-counter");
  if (likeButton.classList.contains("card__like-button_is-active")) {
    deleteLikeAPI(cardId)
      .then((updatedData) => {
        likeButton.classList.toggle("card__like-button_is-active");
        likeCounter.textContent = updatedData.likes.length;
      })
      .catch((err) => {
        console.log(`Ошибка при удалении лайка: ${err}`);
      });
  } else {
    putLikeAPI(cardId)
      .then((updatedData) => {
        likeButton.classList.toggle("card__like-button_is-active");
        likeCounter.textContent = updatedData.likes.length;
      })
      .catch((err) => {
        console.log(`Ошибка при постановке лайка: ${err}`);
      });
  }
};

const deleteCard = (card, cardId) => {
  deleteCardAPI(cardId)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Ошибка: ${res.status}`);
      }
      card.remove();
    })
    .catch((err) => {
      console.log(`Ошибка при удалении карточки: ${err}`);
    });
};
