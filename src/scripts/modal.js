let isPopupOpen = false;

function handleKeydownEsc(evt) {
  if (evt.key === "Escape") {
    closePopup(findActivePopup());
  }
  document.removeEventListener("keydown", handleKeydownEsc);
}

//закрытие попапа нажатием на оверлей
function handleOverlayClick(evt) {
  if (evt.target === findActivePopup()) closePopup(findActivePopup());
}

//возвращает открытый на данный момент попап
function findActivePopup() {
  const activePopup = document.querySelector(".popup_is-opened");
  return activePopup;
}

function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  isPopupOpen = true;
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  isPopupOpen = false;
}

export {
  handleKeydownEsc,
  handleOverlayClick,
  findActivePopup,
  openPopup,
  closePopup,
  isPopupOpen,
};
