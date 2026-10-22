const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const editButton = document.querySelector(".profile__edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const editPopup = document.querySelector("#edit-popup");
const editProfileForm = document.querySelector("#edit-profile-form");
const profileNameInput = editProfileForm.querySelector(
  ".popup__input_type_name",
);
const profileDescriptionInput = editProfileForm.querySelector(
  ".popup__input_type_description",
);

const cardTemplate = document.querySelector("#card-template");
const cardContainer = document.querySelector(".cards__list");

const newCardPopup = document.querySelector("#new-card-popup");
const newCardButton = document.querySelector(".profile__add-button");
const newCardForm = document.querySelector("#new-card-form");
const newCardNameInput = newCardForm.querySelector(
  ".popup__input_type_card-name",
);
const newCardLinkInput = newCardForm.querySelector(".popup__input_type_url");

const imagePopup = document.querySelector("#image-popup");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");

const popupList = Array.from(document.querySelectorAll(".popup"));

function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscapeKey);
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscapeKey);
}

function handleEscapeKey(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");

    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

function handleOverlayClick(event) {
  if (event.target === event.currentTarget) {
    closeModal(event.currentTarget);
  }
}

function setPopupListeners(popupElement) {
  const closeButton = popupElement.querySelector(".popup__close");

  closeButton.addEventListener("click", () => {
    closeModal(popupElement);
  });
  popupElement.addEventListener("mousedown", handleOverlayClick);
}

function resetFormState(formElement) {
  formElement.reset();
  resetValidation(formElement, validationConfig);
}

function fillProfileForm() {
  profileNameInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  resetValidation(editProfileForm, validationConfig);
  openModal(editPopup);
}

function handleOpenNewCardModal() {
  resetFormState(newCardForm);
  openModal(newCardPopup);
}

function updateProfile() {
  profileTitle.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
}

function handleProfileFormSubmit(event) {
  event.preventDefault();

  if (!editProfileForm.checkValidity()) {
    return;
  }

  updateProfile();
  closeModal(editPopup);
}

function handleCardFormSubmit(event) {
  event.preventDefault();

  if (!newCardForm.checkValidity()) {
    return;
  }

  const newCardElement = getCardElement(
    newCardNameInput.value,
    newCardLinkInput.value,
  );

  cardContainer.prepend(newCardElement);
  closeModal(newCardPopup);
}

function handleLikeButtonClick(event) {
  event.currentTarget.classList.toggle("card__like-button_is-active");
}

function handleDeleteButtonClick(event) {
  event.currentTarget.closest(".card").remove();
}

function handleImageClick(name, link) {
  popupCaption.textContent = name;
  popupImage.src = link;
  popupImage.alt = name;

  openModal(imagePopup);
}

function getCardElement(name, link) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  likeButton.addEventListener("click", handleLikeButtonClick);
  deleteButton.addEventListener("click", handleDeleteButtonClick);
  cardImage.addEventListener("click", () => {
    handleImageClick(name, link);
  });

  return cardElement;
}

popupList.forEach(setPopupListeners);

editButton.addEventListener("click", handleOpenEditModal);
editProfileForm.addEventListener("submit", handleProfileFormSubmit);

newCardButton.addEventListener("click", handleOpenNewCardModal);
newCardForm.addEventListener("submit", handleCardFormSubmit);

initialCards.forEach((card) => {
  cardContainer.append(getCardElement(card.name, card.link));
});
