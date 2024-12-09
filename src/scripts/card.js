export { createCard, deleteCard, like };

function createCard(
  item,
  cardTemplate,
  { deleteCard, like, handleImageClick }
) {
  /* Здравствуйте, не совсем вот понял, как можно 'найти' cardTemplate из index.js и обойтись без импорта,
   попробовал способ сделать её глобальной переменной через window, надеюсь правильно понял, что нужно было сделать
  */
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardElement.querySelector(".card__title").textContent = item.name;

  likeButton.addEventListener("click", like);

  cardImage.addEventListener("click", handleImageClick);

  deleteButton.addEventListener("click", function () {
    deleteCard(cardElement);
  });

  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

function like(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}