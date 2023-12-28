const showInputError = (formElement, inputElement, Validationconfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  const errorMessage = inputElement.validationMessage;
  errorElement.textContent = errorMessage;
  inputElement.classList.add(Validationconfig.inputErrorClass);
  errorElement.classList.add(Validationconfig.errorClass);
}

const hideInputError = (formElement, inputElement, Validationconfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  const errorMessage = '';
  errorElement.textContent = errorMessage;
  inputElement.classList.remove(Validationconfig.inputErrorClass);
  errorElement.classList.remove(Validationconfig.errorClass);
}

const toggleButtonState = (isValid, buttonElement, Validationconfig) => {
  if (!isValid) {
    buttonElement.classList.add(Validationconfig.inactiveButtonClass);
    buttonElement.disabled = true;
  }
  else {
    buttonElement.classList.remove(Validationconfig.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

const checkInputValidity = (formElement, inputElement, Validationconfig) => {
  const isInputValid = inputElement.validity.valid;
  const isPatternMismatch = inputElement.validity.patternMismatch;

  if (isPatternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  }
  else {
    inputElement.setCustomValidity('');
  }

  if (!isInputValid) {
    showInputError(formElement, inputElement, Validationconfig);
  }
  else {
    hideInputError(formElement, inputElement, Validationconfig);
  }
}

const setEventListeners = (formElement, Validationconfig) => {
  const inputList = [...formElement.querySelectorAll(Validationconfig.inputSelector)];
  const buttonElement = formElement.querySelector(Validationconfig.submitButtonSelector);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, Validationconfig);
      toggleButtonState(formElement.checkValidity(), buttonElement, Validationconfig);
    });
  });
};

export const clearValidation = (formElement, config) => {
  const formSubmitButton = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(false, formSubmitButton, config);
  const inputList = [...formElement.querySelectorAll(config.inputSelector)];
  inputList.forEach(inputElement =>  hideInputError(formElement, inputElement, config));
}

export const enableValidation = config => {
  const formList = [...document.querySelectorAll(config.formSelector)];
  formList.forEach(formElement => setEventListeners(formElement, config));
};