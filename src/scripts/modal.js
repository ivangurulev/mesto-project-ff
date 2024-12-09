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
  openPopup,
  closePopup,
};