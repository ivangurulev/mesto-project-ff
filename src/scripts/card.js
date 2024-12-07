export { createCard, addCard, deleteCard, like };
import { cardTemplate, cardList } from "../index.js";

function createCard(item, { deleteCard, like, handleImageClick }) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardElement.querySelector(".card__title").textContent = item.name;

  deleteButton.addEventListener("click", function () {
    deleteCard(cardElement);
  });

  return cardElement;
}

function addCard(item) {
  const cardElement = createCard(item, { deleteCard });
  cardList.prepend(cardElement);
}

function deleteCard(cardElement) {
  cardElement.remove();
}

function like(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}
