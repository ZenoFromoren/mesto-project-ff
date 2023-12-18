const showInputError = (formElement, inputElement, config = {}) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  const errorMessage = inputElement.validationMessage;
  errorElement.textContent = errorMessage;
  inputElement.classList.add(config.inputErrorClass);
  errorElement.classList.add(config.errorClass);
}

const hideInputError = (formElement, inputElement, config = {}) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  const errorMessage = '';
  errorElement.textContent = errorMessage;
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
}

const hasInvalidInput = inputList => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  })
}

const toggleButtonState = (inputList, buttonElement, config = {}) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  }
  else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

const checkInputValidity = (formElement, inputElement, config = {}) => {
  const isInputValid = inputElement.validity.valid;
  const isPatternMismatch = inputElement.validity.patternMismatch;

  if (!isInputValid) {
    showInputError(formElement, inputElement, config);
  }
  else {
    hideInputError(formElement, inputElement, config);
  }
  
  if (isPatternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  }
  else {
    inputElement.setCustomValidity('');
  }
}

const setEventListeners = (formElement, config = {}) => {
  const inputList = [...formElement.querySelectorAll(config.inputSelector)];
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

export const enableValidation = (config = {}) => {
  const formList = [...document.querySelectorAll(config.formSelector)];
  formList.forEach(formElement => setEventListeners(formElement));
};