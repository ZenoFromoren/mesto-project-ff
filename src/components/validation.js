const showInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  const errorMessage = inputElement.validationMessage;
  errorElement.textContent = errorMessage;
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.classList.add(validationConfig.errorClass);
}

const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  const errorMessage = '';
  errorElement.textContent = errorMessage;
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
}

const toggleButtonState = (isValid, buttonElement, validationConfig) => {
  if (!isValid) {
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
    buttonElement.disabled = true;
  }
  else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

const checkInputValidity = (formElement, inputElement, validationConfig) => {
  const isInputValid = inputElement.validity.valid;
  const isPatternMismatch = inputElement.validity.patternMismatch;

  isPatternMismatch ? inputElement.setCustomValidity(inputElement.dataset.errorMessage) : inputElement.setCustomValidity('');

  !isInputValid ? showInputError(formElement, inputElement, validationConfig) : hideInputError(formElement, inputElement, validationConfig);
}

const setEventListeners = (formElement, validationConfig) => {
  const inputList = [...formElement.querySelectorAll(validationConfig.inputSelector)];
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, validationConfig);
      toggleButtonState(formElement.checkValidity(), buttonElement, validationConfig);
    });
  });
}

export const clearValidation = (formElement, validationConfig) => {
  const formSubmitButton = formElement.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(false, formSubmitButton, validationConfig);
  const inputList = formElement.querySelectorAll(validationConfig.inputSelector);
  inputList.forEach(inputElement =>  hideInputError(formElement, inputElement, validationConfig));
}

export const enableValidation = validationConfig => {
  const formList = [...document.querySelectorAll(validationConfig.formSelector)];
  formList.forEach(formElement => setEventListeners(formElement, validationConfig));
}