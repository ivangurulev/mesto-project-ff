

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    inputElement.classList.add('form__input-error_active');
  }
  
  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = '';
    inputElement.classList.remove('form__input-error_active');
  }
  
  const setEventListeners = (formElement) => {
    const buttonElement = formElement.querySelector('.popup__button');
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      })
    })
  }
  
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }
  
  const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach(formElement => {
      setEventListeners(formElement);
    })
  }
  
  const isValid = (formElement, inputElement) => {
    if(inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    }
    else{
      inputElement.setCustomValidity('');
    }
    if(!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    }
    else {
      hideInputError(formElement, inputElement);
    }
  }
  
  const clearValidation = (formElement, validationConfig) => {
    const buttonElement = formElement.querySelector(`.${validationConfig.submitButtonSelector}`);
    // buttonElement.classList.add(`${validationConfig.inactiveButtonClass}`);
    const inputList = Array.from(formElement.querySelectorAll(`.${validationConfig.inputSelector}`));
    toggleButtonState(inputList, buttonElement);
    inputList.forEach(inputElement => {
      inputElement.classList.remove('form__input-error_active');
    });
    const errorList = Array.from(formElement.querySelectorAll(`.${validationConfig.errorClass}`));
    errorList.forEach(errorElement => {
      errorElement.textContent = '';
    });
  }
  
  
  const toggleButtonState = (inputList, buttonElement) => {
    if(hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add('popup__button-disabled');
    }
    else {
      buttonElement.disabled = false;
      buttonElement.classList.remove('popup__button-disabled');
  }}

export {
    enableValidation,
    clearValidation,
};