// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

function addCard(name, link, cardDelete) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardList = document.querySelector(".places__list");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__title").textContent = name;

  deleteButton.onclick = function () {
    cardDelete(cardElement);
  };

  cardList.append(cardElement);
}

function cardDelete(cardElement) {
  cardElement.remove();
}

initialCards.forEach((item) => {
  addCard(item.name, item.link, cardDelete);
});
