
const addActiveInputError = (inputElement, settings) => {
  inputElement.classList.add(`${settings.activeInputErrorClass}`);
}

const removeActiveInputError = (inputElement, settings) => {
  inputElement.classList.remove(`${settings.activeInputErrorClass}`);
}


const showInputError = (formElement, inputElement, errorMessage, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    addActiveInputError(inputElement, settings)
  }
  
  const hideInputError = (formElement, inputElement, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = '';
    removeActiveInputError(inputElement, settings);
  }
  
  const setEventListeners = (formElement, settings) => {
    const buttonElement = formElement.querySelector(`.${settings.submitButtonSelector}`);
    const inputList = Array.from(formElement.querySelectorAll(`.${settings.inputSelector}`));
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement, settings);
        toggleButtonState(inputList, buttonElement, settings);
      })
    })
  }
  
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }
  
  const enableValidation = (settings) => {
    const formList = Array.from(document.querySelectorAll(`.${settings.formSelector}`));
    formList.forEach(formElement => {
      setEventListeners(formElement, settings);
    })
  }
  
  const isValid = (formElement, inputElement, settings) => {
    if(inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    }
    else{
      inputElement.setCustomValidity('');
    }
    if(!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, settings);
    }
    else {
      hideInputError(formElement, inputElement, settings);
    }
  }
  
  const clearValidation = (formElement, settings) => {
    const buttonElement = formElement.querySelector(`.${settings.submitButtonSelector}`);
    const inputList = Array.from(formElement.querySelectorAll(`.${settings.inputSelector}`));
    toggleButtonState(inputList, buttonElement, settings);
    inputList.forEach(inputElement => {
      removeActiveInputError(inputElement, settings);
    });
    const errorList = Array.from(formElement.querySelectorAll(`.${settings.errorClass}`));
    errorList.forEach(errorElement => {
      errorElement.textContent = '';
    });
  }
  
  
  const toggleButtonState = (inputList, buttonElement, settings) => {
    if(hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(`${settings.inactiveButtonClass}`);
    }
    else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(`${settings.inactiveButtonClass}`);
  }}


export {
    enableValidation,
    clearValidation,
};