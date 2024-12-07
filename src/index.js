import { initialCards } from "./scripts/cards.js";
import { createCard, addCard, deleteCard, like } from "./scripts/card.js";
import {
  handleKeydownEsc,
  handleOverlayClick,
  findActivePopup,
  openPopup,
  closePopup,
  isPopupOpen,
} from "./scripts/modal.js";
import './pages/index.css';
export { cardTemplate, cardList };


// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector(".places__list");
const addCardPopup = document.querySelector(".popup_type_new-card");
const addButton = document.querySelector(".profile__add-button");
const addCardForm = addCardPopup.querySelector(".popup__form");
const cardNameInput = addCardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = addCardForm.querySelector(".popup__input_type_url");
const cardImagePopup = document.querySelector(".popup_type_image");
const editPopup = document.querySelector(".popup_type_edit");
const editProfileButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileEditForm = editPopup.querySelector(".popup__form");
const nameInput = profileEditForm.querySelector(".popup__input_type_name");
const jobInput = profileEditForm.querySelector(
  ".popup__input_type_description"
);

initialCards.forEach((item) => {
  addCard(item);
});

//закрытие попапа нажатием на крестик
function handleCloseButton(evt) {
  if (evt.target.classList.contains("popup__close"))
    closePopup(findActivePopup());
}

//проверяет открыт ли в данный момент попап, чтобы добавить слушатели событий для его закрытия
function checkPopup() {
  if (isPopupOpen) {
    findActivePopup().addEventListener("click", handleCloseButton);
    findActivePopup().addEventListener("click", handleOverlayClick);
    document.addEventListener("keydown", handleKeydownEsc);
  }
}

setInterval(checkPopup, 500);

// обработчики событий для открытия попапов
document.addEventListener("click", function (evt) {
  handleEditButtonClick(evt);
  handleAddButtonClick(evt);
  handleImageClick(evt);
});

//функция открытия попапа добавления карточек
function handleAddButtonClick(evt) {
  if (evt.target.classList.contains("profile__add-button")) {
    openPopup(addCardPopup);
  }
}
//функция открытия попапа с картинкой карточки
function handleImageClick(evt) {
  if (evt.target.classList.contains("card__image")) {
    const popupImage = cardImagePopup.querySelector(".popup__image");
    const popupCaption = cardImagePopup.querySelector(".popup__caption");
    popupImage.src = evt.target.src;
    popupCaption.textContent = evt.target.alt;
    openPopup(cardImagePopup);
  }
}
//функция открытия попапа для редактирования профиля
function handleEditButtonClick(evt) {
  if (evt.target.classList.contains("profile__edit-button")) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    openPopup(editPopup);
  }
}

// логика закрытия попапа, при нажатии на кнопку сохранения данных
function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(editPopup);
}

profileEditForm.addEventListener("submit", handleEditProfileSubmit);

//функция добавления карточки через попап
function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const item = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };
  addCard(item);
  closePopup(addCardPopup);
}

addCardForm.addEventListener("submit", handleAddCardSubmit);

document.addEventListener("click", like);
