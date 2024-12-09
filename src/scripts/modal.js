let activePopup = null;

function handleKeydownEsc(evt) {
  if (evt.key === "Escape") {
    closePopup(activePopup);
  }
}

function closePopupByClick(evt) {
  if (
    evt.target === activePopup ||
    evt.target.classList.contains("popup__close")
  ) {
    closePopup(activePopup);
  }
}

//возвращает открытый на данный момент попап
function findActivePopup() {
  if (activePopup) return document.querySelector(".popup_is-opened");
}

function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  activePopup = popup;
  document.addEventListener("keydown", handleKeydownEsc);
  popup.addEventListener("click", closePopupByClick);
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  activePopup = null;
  document.removeEventListener("keydown", handleKeydownEsc);
  popup.removeEventListener("click", closePopupByClick);
}

export {
  handleKeydownEsc,
  closePopupByClick,
  findActivePopup,
  activePopup,
  openPopup,
  closePopup,
};
