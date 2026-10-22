const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const errorMessages = {
  valueMissing: "Preencha esse campo.",
  typeMismatch: "Por favor, insira um endereço web.",
  tooShort: "Aumente este texto para {minLength} caracteres ou mais.",
};

function getFormControls(formElement, config) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector),
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  return { inputList, buttonElement };
}

function getErrorMessage(inputElement) {
  const { validity } = inputElement;

  if (validity.valueMissing) {
    return errorMessages.valueMissing;
  }

  if (validity.typeMismatch) {
    return errorMessages.typeMismatch;
  }

  if (validity.tooShort) {
    return errorMessages.tooShort.replace(
      "{minLength}",
      inputElement.minLength,
    );
  }

  return inputElement.validationMessage;
}

function getErrorElement(formElement, inputElement) {
  return formElement.querySelector(`#${inputElement.id}-error`);
}

function showInputError(formElement, inputElement, config) {
  const errorElement = getErrorElement(formElement, inputElement);

  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = getErrorMessage(inputElement);
  errorElement.classList.add(config.errorClass);
}

function hideInputError(formElement, inputElement, config) {
  const errorElement = getErrorElement(formElement, inputElement);

  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(config.errorClass);
}

function checkInputValidity(formElement, inputElement, config) {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, config);
  } else {
    showInputError(formElement, inputElement, config);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

function toggleButtonState(inputList, buttonElement, config) {
  const invalidInputFound = hasInvalidInput(inputList);

  buttonElement.disabled = invalidInputFound;
  buttonElement.classList.toggle(config.inactiveButtonClass, invalidInputFound);
}

function setEventListeners(formElement, config) {
  const { inputList, buttonElement } = getFormControls(formElement, config);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
}

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
}

function resetValidation(formElement, config) {
  const { inputList, buttonElement } = getFormControls(formElement, config);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, config);
  });

  toggleButtonState(inputList, buttonElement, config);
}

enableValidation(validationConfig);
