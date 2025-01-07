import { createCard, deleteCard, likeCard } from "./scripts/card.js";
import { popupOperate } from "./scripts/modal.js";
import { enableValidation, clearValidation } from "./scripts/validation.js";
import {
  postCard,
  patchAvatar,
  requestCards,
  postProfileData,
  requestProfileData,
} from "./scripts/api.js";
import "./pages/index.css";

// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector(".places__list");
const addCardPopup = document.querySelector(".popup_type_new-card");
const addButton = document.querySelector(".profile__add-button");
const addCardForm = document.forms.newPlace;
const avatarPopupForm = document.forms.newAvatar;
const avatarInput = avatarPopupForm.querySelector(".popup__input_type_url");
const cardNameInput = addCardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = addCardForm.querySelector(".popup__input_type_url");
const avatarPopup = document.querySelector(".popup_type_profile_image");
const cardImagePopup = document.querySelector(".popup_type_image");
const likeButton = document.querySelector(".card__like-button");
const editPopup = document.querySelector(".popup_type_edit");
const editProfileButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const submitButton = document.querySelector(".popup__button");
const openPopupButtons = document.querySelectorAll(".popup__open-button");
const profileImage = document.querySelector(".profile__image");
const popupCaption = cardImagePopup.querySelector(".popup__caption");
const popupImage = cardImagePopup.querySelector(".popup__image");
const profileEditForm = document.forms.editProfile;
const nameInput = profileEditForm.querySelector(".popup__input_type_name");
const aboutInput = profileEditForm.querySelector(
  ".popup__input_type_description"
);

let userId = null;
const popupManager = popupOperate();

const validationConfig = {
  formSelector: "popup__form",
  inputSelector: "popup__input",
  submitButtonSelector: "popup__button",
  inactiveButtonClass: "popup__button-disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "form__input-error",
  activeInputErrorClass: "form__input-error_active",
};

function addCard(cardData) {
  const cardElement = createCard(
    cardData,
    cardTemplate,
    deleteCard,
    likeCard,
    handleImageClick,
    userId
  );
  cardList.prepend(cardElement);
}

// обработчики событий для открытия попапов
openPopupButtons.forEach((button) => {
  button.addEventListener("click", function (evt) {
    // Я добавил аватару и кнопкам, отвечающим за открытие попапов, один класс. И создал слушатель для всех элементов с этим классом
    handleEditButtonClick(evt);
    handleAddButtonClick(evt);
    handleAvatarClick(evt);
  });
});

//функция открытия попапа добавления карточек
function handleAddButtonClick(evt) {
  if (evt.target.classList.contains("profile__add-button")) {
    addCardForm.reset();
    popupManager.openPopup(addCardPopup);
    clearValidation(addCardForm, validationConfig);
  }
}
//функция открытия попапа с картинкой карточки
function handleImageClick(evt) {
  if (evt.target.classList.contains("card__image")) {
    popupImage.src = evt.target.src;
    popupCaption.textContent = evt.target.alt;
    popupImage.alt = popupCaption;
    popupManager.openPopup(cardImagePopup);
  }
}
//функция открытия попапа для редактирования профиля
function handleEditButtonClick(evt) {
  if (evt.target.classList.contains("profile__edit-button")) {
    nameInput.value = profileName.textContent;
    aboutInput.value = profileDescription.textContent;
    popupManager.openPopup(editPopup);
    clearValidation(profileEditForm, validationConfig);
  }
}
function handleAvatarClick(evt) {
  if (
    evt.target.classList.contains("profile__image") ||
    evt.target.classList.contains("profile__edit-icon")
  ) {
    popupManager.openPopup(avatarPopup);
    avatarPopupForm.reset();
    clearValidation(avatarPopupForm, validationConfig);
  }
}

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  renderLoading(evt, true);
  patchAvatar(avatarInput.value)
    .then((userData) => {
      changeAvatar(userData.avatar);
      popupManager.closePopup(avatarPopup);
    })
    .catch((err) => {
      console.log(`Ошибка при обновлении картинки профиля: ${err}`);
    })
    .finally(() => renderLoading(evt, false));
}

function changeAvatar(imgURL) {
  profileImage.removeAttribute("style");
  profileImage.style.backgroundImage = `url('${imgURL}')`;
}

avatarPopupForm.addEventListener("submit", handleAvatarSubmit);

// логика закрытия попапа, при нажатии на кнопку сохранения данных
function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  renderLoading(evt, true);
  postProfileData(nameInput, aboutInput)
    .then((updatedData) => {
      profileName.textContent = updatedData.name;
      profileDescription.textContent = updatedData.about;
      popupManager.closePopup(editPopup);
    })
    .catch((err) => {
      console.log(`Ошибка при обновлении данных профиля: ${err}`);
    })
    .finally(() => renderLoading(evt, false));
}

profileEditForm.addEventListener("submit", handleEditProfileSubmit);

//функция добавления карточки через попап
function handleAddCardSubmit(evt) {
  evt.preventDefault();
  renderLoading(evt, true);
  const newCard = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
    likes: [],
  };
  postCard(newCard)
    .then((newCardData) => {
      addCard(newCardData);
      addCardForm.reset();
      popupManager.closePopup(addCardPopup);
    })
    .catch((err) => {
      console.log(`Ошибка при публикации карточки: ${err}`);
    })
    .finally(() => renderLoading(evt, false));
}

enableValidation(validationConfig);

addCardForm.addEventListener("submit", handleAddCardSubmit);

const renderProfileData = (
  data,
  profileName,
  profileDescription,
  profileImage
) => {
  profileName.textContent = data.name;
  profileDescription.textContent = data.about;
  profileImage.style.backgroundImage = `url(${data.avatar})`;
};

const renderCards = (data) => {
  data.reverse().forEach((cardData) => {
    addCard(cardData);
  });
};

const renderLoading = (evt, isLoading) => {
  const button = evt.target.closest(".popup").querySelector(".popup__button");
  if (isLoading) button.textContent = "Сохранение...";
  else {
    button.textContent = "Сохранить";
  }
};

Promise.all([requestProfileData(), requestCards()])
  .then(([userData, cardsData]) => {
    console.log("Данные получены");
    userId = userData._id;
    renderProfileData(userData, profileName, profileDescription, profileImage);
    renderCards(cardsData, userId);
  })
  .catch((error) => {
    console.log(`Ошибка запроса данных: ${error}`);
  });
